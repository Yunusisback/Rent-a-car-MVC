export class CarModel {
  constructor() {
    this.cars = [
      {
        id: 1,
        brand: 'Mercedes-Benz',
        model: 'C-200 4MATIC',
        pricePerDay: 1800,
        available: false,
        image: 'https://img.hasmer.com.tr/upload/k82261b.jpg?w=650',
        type: 'sedan',
        transmission: 'automatic',
        seats: 5,
        luggage: 455
      },
      {
        id: 2,
        brand: 'BMW',
        model: '760Li xDrive',
        pricePerDay: 2900,
        available: false,
        image: 'https://spots.ag/2023/09/15/bmw-m760li-xdrive-2019-c692015092023120726_1.jpg',
        type: 'luxury',
        transmission: 'automatic',
        seats: 5,
        luggage: 515
      },
      {
        id: 3,
        brand: 'Mercedes-Benz',
        model: 'S-Class',
        pricePerDay: 4000,
        available: false,
        image: 'https://i.ytimg.com/vi/WLpStXyFNhE/maxresdefault.jpg',
        type: 'luxury',
        transmission: 'automatic',
        seats: 5,
        luggage: 550
      },
      {
        id: 4,
        brand: 'Volkswagen',
        model: 'Passat',
        pricePerDay: 500,
        available: false,
        image: 'https://flib.samar.pl/800/000/8770892bb7c0c7ceb0b640.webp',
        type: 'sedan',
        transmission: 'automatic',
        seats: 5,
        luggage: 586
      },
      {
        id: 5,
        brand: 'Volkswagen',
        model: 'Touran',
        pricePerDay: 600,
        available: true,
        image: 'https://www.sekizsilindir.com/wp-content/uploads/2015/02/2015-VW-Touran-4.jpg',
        type: 'compact',
        transmission: 'manual',
        seats: 7,
        luggage: 565
      },
      {
        id: 6,
        brand: 'Citroen',
        model: 'C3',
        pricePerDay: 350,
        available: true,
        image: 'https://cdn.cetas.com.tr/Delivery/Public/Image/-1x-1/citroen_c3_01_1448717875.jpg',
        type: 'compact',
        transmission: 'manual',
        seats: 5,
        luggage: 300
      },
      {
        id: 7,
        brand: 'Audi',
        model: 'R8',
        pricePerDay: 8000,
        available: false,
        image: 'https://media.carvia.com/Audi%20R8%20-%20Frontansicht-1920x1080.webp',
        type: 'sports',
        transmission: 'automatic',
        seats: 2,
        luggage: 100
      },
      {
        id: 8,
        brand: 'Mercedes-Benz',
        model: 'Vito',
        pricePerDay: 900,
        available: false,
        image: 'https://langhoej.dk/wp-content/uploads/2024/11/bil_1.31.1-scaled.jpg',
        type: 'van',
        transmission: 'automatic',
        seats: 9,
        luggage: 610
      },
      {
        id: 9,
        brand: 'Chevrolet',
        model: 'Tahoe',
        pricePerDay: 3000,
        available: false,
        image: 'https://hips.hearstapps.com/hmg-prod/images/2025-chevrolet-tahoe-101-6878f805e6698.jpg',
        type: 'suv',
        transmission: 'automatic',
        seats: 8,
        luggage: 433
      },
      {
        id: 10,
        brand: 'BMW',
        model: 'X7',
        pricePerDay: 2000,
        available: true,
        image: 'https://cdn.motor1.com/images/mgl/x1kK6/s1/4x3/2021-bmw-x7-dark-shadow-edition-front-three-quarters-above.webp',
        type: 'suv',
        transmission: 'automatic',
        seats: 7,
        luggage: 300
      },
      {
        id: 11,
        brand: 'Nissan',
        model: 'Patrol',
        pricePerDay: 1000,
        available: true,
        image: 'https://carsemsar.s3.amazonaws.com/cars/2024/11/14/8657905104040788/6735d475776c85.79621287/photo-lg.jpg',
        type: 'suv',
        transmission: 'automatic',
        seats: 8,
        luggage: 607
      },
      {
        id: 12,
        brand: 'Toyota',
        model: 'Land Cruiser',
        pricePerDay: 1500,
        available: false,
        image: 'https://obaidigroup.com/wp-content/uploads/2024/03/Toyota-Land-Cruiser-GXR-V-2023-Iraq-19.jpg',
        type: 'suv',
        transmission: 'automatic',
        seats: 7,
        luggage: 350
      },
      {
        id: 13,
        brand: 'Porsche',
        model: 'Cayenne',
        pricePerDay: 4000,
        available: true,
        image: 'https://cdn.motor1.com/images/mgl/RpmAg/s1/2021-porsche-cayenne-coupe-gts.jpg',
        type: 'luxury',
        transmission: 'automatic',
        seats: 5,
        luggage: 770
      },
      {
        id: 14,
        brand: 'Ford',
        model: 'Edge',
        pricePerDay: 2500,
        available: false,
        image: 'https://topusedcars.com/media/magefan_blog/Blog_Post_Images/1_27.jpg',
        type: 'suv',
        transmission: 'automatic',
        seats: 5,
        luggage: 969
      },
      {
        id: 15,
        brand: 'Volvo',
        model: 'XC90',
        pricePerDay: 2900,
        available: false,
        image: 'https://di-uploads-pod13.dealerinspire.com/volvocarscincinnatinorth/uploads/2025/04/Volvo-XC90-2504-.webp',
        type: 'suv',
        transmission: 'automatic',
        seats: 7,
        luggage: 310
      },
      {
        id: 16,
        brand: 'Audi',
        model: 'A6 Avant',
        pricePerDay: 5500,
        available: true,
        image: 'https://cdn.motor1.com/images/mgl/8wxoP/s1/audi-a6-avant-55-tfsi-e.jpg',
        type: 'luxury',
        transmission: 'automatic',
        seats: 5,
        luggage: 565
      },
      {
        id: 17,
        brand: 'Lexus',
        model: 'LX 700H',
        pricePerDay: 2500,
        available: true,
        image: 'https://imagecdnsa.zigwheels.ae/large/gallery/exterior/22/2052/lexus-lx-700h-full-front-view-572283.jpg',
        type: 'suv',
        transmission: 'automatic',
        seats: 7,
        luggage: 198
      },
      {
        id: 18,
        brand: 'Land Rover',
        model: 'Range Rover Sport',
        pricePerDay: 2400,
        available: true,
        image: 'https://pics.auto-commerce.eu/ac6376/foto/172226034504301.JPG',
        type: 'suv',
        transmission: 'automatic',
        seats: 5,
        luggage: 725
      },
      {
        id: 19,
        brand: 'Mercedes-Benz',
        model: 'AMG GT',
        pricePerDay: 7500,
        available: true,
        image: 'https://carmazoon24-pu04.ihre-webseite.it/vehicle/images/image01.two-sales.de/4012004002/278030_1/700-90/vehicle.jpg?1761051600',
        type: 'sports',
        transmission: 'automatic',
        seats: 2,
        luggage: 456
      },
      {
        id: 20,
        brand: 'Mercedes-Benz',
        model: 'GLS 63 AMG',
        pricePerDay: 5000,
        available: true,
        image: 'https://www.carscare.pl/wp-content/uploads/2024/07/GLS63-PPF-MAT-7-of-10_edited.jpg',
        type: 'luxury',
        transmission: 'automatic',
        seats: 7,
        luggage: 355
      },
      {
        id: 21,
        brand: 'Cadillac',
        model: 'Escalade',
        pricePerDay: 3700,
        available: true,
        image: 'https://www.edmunds.com/assets/m/cadillac/escalade/2023/oem/2023_cadillac_escalade_4dr-suv_premium-luxury_fq_oem_1_600.jpg',
        type: 'suv',
        transmission: 'automatic',
        seats: 8,
        luggage: 722
      }
    ];
}

  getAllCars() {
    return this.cars;
  }

  getCarById(id) {
    const carId = parseInt(id, 10);
    return this.cars.find(car => car.id === carId);
  }

  // Filtreleme fonksiyonu 

  filterCars(filters) {
    let filtered = [...this.cars];

    // Arama sorgusu

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(car =>
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query)
      );
    }

    // Araç tipi

    if (filters.carType && filters.carType !== 'all') {
      filtered = filtered.filter(car => car.type === filters.carType);
    }

    // Marka

    if (filters.brand && filters.brand !== 'all') {
      filtered = filtered.filter(car => car.brand === filters.brand);
    }

    // Vites tipi

    if (filters.transmission && filters.transmission !== 'all') {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    // Fiyat aralığı

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(car =>
        car.pricePerDay >= min && car.pricePerDay <= max
      );
    }
    
 
    
    // Koltuk Sayısı 

    if (filters.minSeats && filters.minSeats > 0) {
      filtered = filtered.filter(car => car.seats >= filters.minSeats);
    }
    
    // Bagaj Kapasitesi 

    if (filters.minLuggage && filters.minLuggage > 0) {
      filtered = filtered.filter(car => car.luggage >= filters.minLuggage);
    }

    return filtered;
  }

  // Tüm markaları getir

  getAllBrands() {
    const brands = [...new Set(this.cars.map(car => car.brand))];
    return brands.sort();
  }
  
  // Tüm koltuk sayılarını getir

  getAllSeatsOptions() {
    const seats = [...new Set(this.cars.map(car => car.seats))].sort((a, b) => a - b);
    return seats;
  }
  
  // Tüm bagaj kapasitelerini getir

  getAllLuggageOptions() {
    const luggage = [...new Set(this.cars.map(car => car.luggage))].sort((a, b) => a - b);
    return luggage;
  }

  rentCar(id) {
    const car = this.getCarById(id);

    if (!car) {
      return { success: false, message: 'Araç bulunamadı' };
    }

    if (!car.available) {
      return { success: false, message: 'Araç zaten kiralanmış' };
    }

    car.available = false;
    return { success: true, message: 'Araç kiralandı', car: car };
  }

  calculatePrice(carId, days) {
    const car = this.getCarById(carId);

    if (!car || isNaN(days) || days <= 0) {
      return null;
    }

    const total = car.pricePerDay * days;
    return total;
  }

  getCarCount() {
    return this.cars.length;
  }
}
