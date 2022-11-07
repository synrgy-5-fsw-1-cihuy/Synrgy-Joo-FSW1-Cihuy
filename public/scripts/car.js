class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({ id, plate, manufacture, model, image, rentPerDay, capacity, description, transmission, available, type, year, options, specs, availableAt }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="card p-3 mt-4">
      <img src="${this.image}" class="card-img-top car-img" style="height: 260px; widht: 200px;" alt="...">
      <div class="mt-3 d-grid">
      <h5>${this.manufacture} ${this.model} / ${this.type}</h5>
      <h4>Rp. ${this.rentPerDay} / hari</h4>
      <p>
      ${this.description}
      </p>
      <p>
      <span class="fa-solid fa-users"></span>
      ${this.capacity} Orang
      </p>
      <p>
      <span class="fa-solid fa-gear"></span>
      ${this.transmission}
      </p>
      <p>${this.availableAt}</p>
      <p>
      <span class="fa-solid fa-calendar"></span>
      Tahun ${this.year}
      </p>
      <a href="#" class="btn btn-success text-white">Pilih Mobil</a>
      </div>
      </div>
    `;
  }
}
