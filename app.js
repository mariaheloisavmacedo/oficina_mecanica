const STORAGE_KEY = 'oficina-mecanica-v1';

class Cliente {
  constructor(data) {
    Object.assign(this, data);
  }
}

class Veiculo {
  constructor(data) {
    Object.assign(this, data);
  }
}

class ServicoExecutado {
  constructor(data) {
    Object.assign(this, data);
  }
}

class HistoricoStatus {
  constructor(data) {
    Object.assign(this, data);
  }
}

class OrdemServico {
  constructor(data) {
    Object.assign(this, { services: [], history: [] }, data);
    this.services = this.services.map((service) => new ServicoExecutado(service));
    this.history = this.history.map((entry) => new HistoricoStatus(entry));
  }

  get total() {
    return this.services.reduce((sum, service) => sum + service.price, 0);
  }

  addService(service) {
    if (!['Aberta', 'Em Execução'].includes(this.status)) {
      throw new Error('Esta ordem não aceita novos serviços neste status.');
    }
    this.services.push(new ServicoExecutado(service));
  }

  changeStatus(nextStatus, responsible, message) {
    const flow = ['Aberta', 'Em Análise', 'Em Execução', 'Concluída'];
    const currentIndex = flow.indexOf(this.status);
    const validNext = nextStatus === 'Cancelada'
      ? currentIndex >= 0 && currentIndex < flow.length - 1
      : currentIndex >= 0 && nextStatus === flow[currentIndex + 1];

    if (!validNext) throw new Error('Transição de status não permitida.');
    if (nextStatus === 'Concluída' && this.services.length === 0) {
      throw new Error('Lance ao menos um serviço antes de concluir a ordem.');
    }

    this.status = nextStatus;
    this.history.push(new HistoricoStatus({ status: nextStatus, at: new Date().toISOString(), responsible, message }));
  }
}

function readStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      customers: (saved.customers || []).map((customer) => new Cliente(customer)),
      vehicles: (saved.vehicles || []).map((vehicle) => new Veiculo(vehicle)),
      orders: (saved.orders || []).map((order) => new OrdemServico(order)),
    };
  } catch {
    return { customers: [], vehicles: [], orders: [] };
  }
}

const state = readStorage();
let selectedOrderId = null;
let toastTimer;

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function money(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function nextId(items) {
  return items.reduce((largest, item) => Math.max(largest, Number(item.id) || 0), 0) + 1;
}

function isValidDocument(value) {
  const digits = value.replace(/\D/g, '');
  if (!/^\d{11}$|^\d{14}$/.test(digits) || /^\d+$/.test(digits) && new Set(digits).size === 1) return false;

  const checkDigit = (base, weights) => {
    const remainder = base.split('').reduce((sum, digit, index) => sum + Number(digit) * weights[index], 0) % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  if (digits.length === 11) {
    const first = checkDigit(digits.slice(0, 9), [10, 9, 8, 7, 6, 5, 4, 3, 2]);
    const second = checkDigit(digits.slice(0, 9) + first, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
    return digits.endsWith(`${first}${second}`);
  }

  const first = checkDigit(digits.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = checkDigit(digits.slice(0, 12) + first, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return digits.endsWith(`${first}${second}`);
}

function showMessage(message, isError = false) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.toggle('is-error', isError);
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3000);
}

function appendCell(row, content, className = '') {
  const cell = document.createElement('td');
  if (typeof content === 'string') cell.textContent = content;
  else cell.append(content);
  if (className) cell.className = className;
  row.append(cell);
  return cell;
}

function findVehicle(vehicleId) {
  return state.vehicles.find((vehicle) => vehicle.id === vehicleId);
}

function findCustomer(customerId) {
  return state.customers.find((customer) => customer.id === customerId);
}

function render() {
  renderVehicleOptions();
  renderOrders();
  renderMetrics();
  renderSelectedOrder();
}

function renderVehicleOptions() {
  const select = document.querySelector('#vehicle-select');
  const selected = select.value;
  select.replaceChildren(new Option('Cadastre ou selecione um veículo', ''));
  state.vehicles.forEach((vehicle) => {
    const customer = findCustomer(vehicle.customerId);
    select.add(new Option(`${vehicle.plate} · ${vehicle.brand} ${vehicle.model} · ${customer?.name || 'Cliente'}`, vehicle.id));
  });
  if (state.vehicles.some((vehicle) => vehicle.id === Number(selected))) select.value = selected;
}

function renderOrders() {
  const list = document.querySelector('#orders-list');
  list.replaceChildren();
  const ordered = [...state.orders].sort((a, b) => b.number - a.number);
  document.querySelector('#empty-orders').hidden = ordered.length > 0;
  document.querySelector('#queue-count').textContent = `${ordered.length} ${ordered.length === 1 ? 'ordem' : 'ordens'}`;

  ordered.forEach((order) => {
    const vehicle = findVehicle(order.vehicleId);
    const customer = vehicle && findCustomer(vehicle.customerId);
    const row = document.createElement('tr');
    appendCell(row, `OS-${String(order.number).padStart(4, '0')}`, 'order-code');
    const vehicleCell = document.createElement('div');
    vehicleCell.className = 'vehicle-cell';
    const customerName = document.createElement('strong');
    customerName.textContent = customer?.name || 'Cliente não encontrado';
    const vehicleName = document.createElement('span');
    vehicleName.textContent = vehicle ? `${vehicle.plate} · ${vehicle.brand} ${vehicle.model}` : 'Veículo não encontrado';
    vehicleCell.append(customerName, vehicleName);
    appendCell(row, vehicleCell);
    appendCell(row, new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(order.openedAt)));
    const status = document.createElement('span');
    status.className = 'status-pill';
    status.dataset.status = order.status;
    status.textContent = order.status;
    appendCell(row, status);
    appendCell(row, money(order.total));
    const action = document.createElement('button');
    action.className = 'table-action';
    action.type = 'button';
    action.textContent = 'Detalhes';
    action.addEventListener('click', () => {
      selectedOrderId = order.id;
      renderSelectedOrder();
      document.querySelector('#order-detail').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    appendCell(row, action);
    list.append(row);
  });
}

function renderMetrics() {
  const active = state.orders.filter((order) => !['Concluída', 'Cancelada'].includes(order.status));
  document.querySelector('#metric-open').textContent = active.filter((order) => ['Aberta', 'Em Análise'].includes(order.status)).length;
  document.querySelector('#metric-progress').textContent = active.filter((order) => order.status === 'Em Execução').length;
  document.querySelector('#metric-done').textContent = state.orders.filter((order) => order.status === 'Concluída').length;
  document.querySelector('#metric-revenue').textContent = money(state.orders.reduce((sum, order) => sum + order.total, 0));
}

function renderSelectedOrder() {
  const detail = document.querySelector('#order-detail');
  const order = state.orders.find((item) => item.id === selectedOrderId);
  detail.hidden = !order;
  if (!order) return;

  const vehicle = findVehicle(order.vehicleId);
  const customer = vehicle && findCustomer(vehicle.customerId);
  document.querySelector('#detail-title').textContent = `OS-${String(order.number).padStart(4, '0')}`;
  document.querySelector('#detail-vehicle').textContent = vehicle ? `${customer?.name || 'Cliente'} · ${vehicle.plate} · ${vehicle.brand} ${vehicle.model}` : 'Veículo não encontrado';
  document.querySelector('#detail-complaint').textContent = order.complaint;
  document.querySelector('#detail-status').textContent = order.status;

  const historyList = document.querySelector('#status-history');
  historyList.replaceChildren();
  order.history.forEach((entry) => {
    const item = document.createElement('li');
    const heading = document.createElement('div');
    heading.className = 'history-entry-heading';
    const status = document.createElement('strong');
    status.textContent = entry.status;
    const date = document.createElement('time');
    date.dateTime = entry.at;
    date.textContent = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(entry.at));
    const message = document.createElement('p');
    message.textContent = entry.message || 'Atualização de status registrada.';
    const responsible = document.createElement('span');
    responsible.className = 'history-responsible';
    responsible.textContent = `Responsável: ${entry.responsible || 'não informado'}`;
    heading.append(status, date);
    item.append(heading, message, responsible);
    historyList.append(item);
  });

  const services = document.querySelector('#service-list');
  services.replaceChildren();
  order.services.forEach((service) => {
    const item = document.createElement('li');
    const description = document.createElement('span');
    description.textContent = `${service.description} · ${service.mechanic}`;
    const price = document.createElement('span');
    price.textContent = money(service.price);
    item.append(description, price);
    services.append(item);
  });
  document.querySelector('#service-empty').hidden = order.services.length > 0;

  const serviceForm = document.querySelector('#service-form');
  const canAddService = ['Aberta', 'Em Execução'].includes(order.status);
  serviceForm.querySelectorAll('input, button').forEach((control) => { control.disabled = !canAddService; });

  const statusSelect = document.querySelector('#status-select');
  statusSelect.replaceChildren();
  const nextStatus = getNextStatuses(order);
  nextStatus.forEach((status) => statusSelect.add(new Option(status, status)));
  document.querySelector('#status-button').disabled = nextStatus.length === 0;
}

function getNextStatuses(order) {
  const flow = ['Aberta', 'Em Análise', 'Em Execução', 'Concluída'];
  const index = flow.indexOf(order.status);
  if (index < 0) return [];
  const options = flow[index + 1] ? [flow[index + 1]] : [];
  if (index < flow.length - 1) options.push('Cancelada');
  return options;
}

document.querySelector('#customer-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = Object.fromEntries(new FormData(form));
  const documentNumber = values.document.replace(/\D/g, '');
  const plate = values.plate.replace(/[^a-z0-9]/gi, '').toUpperCase();
  if (!isValidDocument(documentNumber)) {
    showMessage('Informe um CPF ou CNPJ válido.', true);
    return;
  }
  if (!/^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/.test(plate)) {
    showMessage('Informe uma placa válida no padrão antigo ou Mercosul.', true);
    return;
  }
  if (state.customers.some((customer) => customer.document === documentNumber)) {
    showMessage('Já existe um cliente com este CPF/CNPJ.', true);
    return;
  }
  if (state.vehicles.some((vehicle) => vehicle.plate === plate)) {
    showMessage('Esta placa já está cadastrada.', true);
    return;
  }

  const customer = new Cliente({ id: nextId(state.customers), name: values.name.trim(), document: documentNumber, phone: values.phone.trim() });
  state.customers.push(customer);
  state.vehicles.push(new Veiculo({
    id: nextId(state.vehicles), plate, brand: values.brand.trim(), model: values.model.trim(),
    year: Number(values.year), color: values.color.trim(), customerId: customer.id,
  }));
  persist();
  form.reset();
  render();
  showMessage('Cliente e veículo cadastrados.');
});

document.querySelector('#order-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  const vehicleId = Number(values.vehicleId);
  if (!findVehicle(vehicleId)) {
    showMessage('Selecione um veículo cadastrado.', true);
    return;
  }
  const order = new OrdemServico({
    id: nextId(state.orders), number: nextId(state.orders), vehicleId,
    complaint: values.complaint.trim(), openedAt: new Date().toISOString(), status: 'Aberta',
    services: [], history: [new HistoricoStatus({
      status: 'Aberta', at: new Date().toISOString(), responsible: 'Atendimento',
      message: 'A ordem de serviço foi aberta e o veículo deu entrada na oficina.',
    })],
  });
  state.orders.push(order);
  selectedOrderId = order.id;
  persist();
  event.currentTarget.reset();
  render();
  showMessage(`Ordem OS-${String(order.number).padStart(4, '0')} aberta.`);
});

document.querySelector('#service-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const order = state.orders.find((item) => item.id === selectedOrderId);
  if (!order) return;
  const values = Object.fromEntries(new FormData(event.currentTarget));
  try {
    order.addService({
      id: nextId(order.services), description: values.description.trim(), mechanic: values.mechanic.trim(), price: Number(values.price),
    });
    persist();
    event.currentTarget.reset();
    render();
    showMessage('Serviço lançado na ordem.');
  } catch (error) {
    showMessage(error.message, true);
  }
});

document.querySelector('#status-button').addEventListener('click', () => {
  const order = state.orders.find((item) => item.id === selectedOrderId);
  if (!order) return;
  try {
    const nextStatus = document.querySelector('#status-select').value;
    const vehicle = findVehicle(order.vehicleId);
    const customer = vehicle && findCustomer(vehicle.customerId);
    const message = `Olá, ${customer?.name || 'cliente'}. A OS-${String(order.number).padStart(4, '0')} do veículo ${vehicle?.plate || ''} foi atualizada para: ${nextStatus}.`;
    order.changeStatus(nextStatus, 'Operador', message);
    persist();
    render();
    showMessage('Status atualizado. Mensagem registrada para demonstração; WhatsApp não conectado.');
  } catch (error) {
    showMessage(error.message, true);
  }
});

document.querySelector('#close-detail').addEventListener('click', () => {
  selectedOrderId = null;
  renderSelectedOrder();
});

document.querySelector('#tracking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const query = new FormData(event.currentTarget).get('query').trim().toUpperCase();
  const normalizedQuery = query.replace(/[^A-Z0-9]/g, '');
  const order = state.orders.find((item) => findVehicle(item.vehicleId)?.plate === normalizedQuery)
    || state.orders.find((item) => item.number === Number(query.replace(/^OS-?/i, '')) && /^\d+$|^OS-?\d+$/i.test(query));
  const result = document.querySelector('#tracking-result');
  if (!order) {
    result.textContent = 'Nenhuma ordem encontrada para essa consulta.';
    return;
  }
  const vehicle = findVehicle(order.vehicleId);
  result.textContent = `OS-${String(order.number).padStart(4, '0')} · ${vehicle?.plate || ''} · ${order.status}`;
  selectedOrderId = order.id;
  renderSelectedOrder();
  document.querySelector('#order-detail').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

render();