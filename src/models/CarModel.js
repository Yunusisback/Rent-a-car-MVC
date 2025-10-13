export class CarModel {
  constructor() {
    this.cars = [
      {
        id: 1,
        brand: 'Mercedes-Benz',
        model: 'C-200 4MATIC',
        pricePerDay: 1800, 
        available: false,
        image: 'https://img.hasmer.com.tr/upload/k82261b.jpg?w=650?w=400'
      },
      {
        id: 2,
        brand: 'BMW',
        model: '760Li xDrive',
        pricePerDay: 2900, 
        available: false,
        image: 'https://spots.ag/2023/09/15/bmw-m760li-xdrive-2019-c692015092023120726_1.jpg?1694772469?w=400'
      },
      {
        id: 3,
        brand: 'Mercedes-Benz',
        model: 'S-Class',
        pricePerDay: 4000, 
        available: false,
        image: 'https://i.ytimg.com/vi/WLpStXyFNhE/maxresdefault.jpg?w=400'
      },
      {
        id: 4,
        brand: 'Volkswagen',
        model: 'Passat',
        pricePerDay: 500, 
        available: false,
        image: 'https://flib.samar.pl/800/000/8770892bb7c0c7ceb0b640.webp?w=400'
      },
      {
        id: 5,
        brand: 'Volkswagen',
        model: 'Beetle',
        pricePerDay: 600, 
        available: true,
        image: 'https://www.vagcomcenter.com/wp-content/uploads/2023/09/bettle.jpg?w=400'
      },
      {
        id: 6,
        brand: 'Citroen',
        model: 'C3',
        pricePerDay: 350, 
        available: true,
        image: 'https://cdn.cetas.com.tr/Delivery/Public/Image/-1x-1/citroen_c3_01_1448717875.jpg?w=400'
      },
      {
        id: 7,
        brand: 'Audi',
        model: 'R8',
        pricePerDay: 8000, 
        available: false,
        image: 'https://cdn.motor1.com/images/mgl/VzM4p7/s1/audi-r8-japan-final-edition.webp?w=400'
      },
      {
        id: 8,
        brand: 'Mercedes-Benz',
        model: 'Vito',
        pricePerDay: 900, 
        available: false,
        image: 'https://www.sixt.com.tr/storage/cache/3a86730f6ad939320411c8076c6a76b29c8b8c73.webp?w=400'
      },
      {
        id: 9,
        brand: 'Chevrolet',
        model: 'Tahoe',
        pricePerDay: 3000, 
        available: false,
        image: 'https://hips.hearstapps.com/hmg-prod/images/2025-chevrolet-tahoe-101-6878f805e6698.jpg?crop=0.820xw:0.693xh;0.0195xw,0.263xh&resize=2048:*?w=400'
      },
      {
        id: 10,
        brand: 'BMW',
        model: 'X5',
        pricePerDay: 2000, 
        available: true,
        image: 'https://images.pkw.net/p2azlqeljm1ril24d8rxml9a2c99-1584x677/header-bmw-x5.jpg?w=400'
      },
      {
        id: 11,
        brand: 'Nissan',
        model: 'X-Trail',
        pricePerDay: 1000, 
        available: true,
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Nissan_X-Trail_%28left-front%29%2C_Nissan_Gallery_Global_HQ%2C_2021.jpg?w=400'
      },
      {
        id: 12,
        brand: 'Toyota',
        model: 'Land Crusier',
        pricePerDay: 1500, 
        available: false,
        image: 'https://img.hasznaltautocdn.com/640x480/17942420/95304.jpg?w=400'
      },
      {
        id: 13,
        brand: 'Porsche',
        model: 'Cayanne',
        pricePerDay: 4000, 
        available: true,
        image: 'https://cdn.motor1.com/images/mgl/RpmAg/s1/2021-porsche-cayenne-coupe-gts.jpg?w=400'
      },
      {
        id: 14,
        brand: 'Ford',
        model: 'Explorer',
        pricePerDay: 2000, 
        available: false,
        image: 'https://images.cars.com/cldstatic/wp-content/uploads/ford-explorer-limited-4wd-2020-04-exterior--front--silver.jpg?w=400'
      },
      {
        id: 15,
        brand: 'Volvo',
        model: 'XC90',
        pricePerDay: 2900, 
        available: false,
        image: 'https://di-uploads-pod13.dealerinspire.com/volvocarscincinnatinorth/uploads/2025/04/Volvo-XC90-2504-.webp?w=400'
      },
      {
        id: 16,
        brand: 'Audi',
        model: 'A6 Avant',
        pricePerDay: 3500, 
        available: true,
        image: 'https://cdn.motor1.com/images/mgl/8wxoP/s1/audi-a6-avant-55-tfsi-e.jpg?w=400'
      },
      {
        id: 17,
        brand: 'Lexus',
        model: 'LX 700H',
        pricePerDay: 2500, 
        available: true,
        image: 'https://imagecdnsa.zigwheels.ae/large/gallery/exterior/22/2052/lexus-lx-700h-full-front-view-572283.jpg?w=400'
      },
      {
        id: 18,
        brand: 'Land Rover',
        model: 'Range Rover Sport',
        pricePerDay: 2400, 
        available: true,
        image: 'https://pics.auto-commerce.eu/ac6376/foto/172226034504301.JPG?w=400'
      },
      {
        id: 19,
        brand: 'Mercedes-Benz',
        model: 'AMG GT ',
        pricePerDay: 5500, 
        available: true,
        image: 'https://handwiki.org/wiki/images/thumb/1/1a/Geneva_International_Motor_Show_2018%2C_Le_Grand-Saconnex_%281X7A1872%29.jpg/640px-Geneva_International_Motor_Show_2018%2C_Le_Grand-Saconnex_%281X7A1872%29.jpg?w=400'
      },
      {
        id: 20,
        brand: 'Mercedes-Benz',
        model: 'GLS 63 AMG',
        pricePerDay: 5000, 
        available: true,
        image: 'https://www.carscare.pl/wp-content/uploads/2024/07/GLS63-PPF-MAT-7-of-10_edited.jpg?w=400'
      },
      {
        id: 21,
        brand: 'Cadillac',
        model: 'Escalade',
        pricePerDay: 3700, 
        available: true,
        image: 'https://www.edmunds.com/assets/m/cadillac/escalade/2023/oem/2023_cadillac_escalade_4dr-suv_premium-luxury_fq_oem_1_600.jpg?w=400'
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