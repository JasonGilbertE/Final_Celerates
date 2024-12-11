const { Flashsale } = require('../infrastructure/models');
const { Op } = require('sequelize');

class FlashSaleRepository {
  async create(flashSale) {
    return await Flashsale.create(flashSale);
  }

  async findAllActive() {
    const moment = require("moment-timezone");
    const nowInJakarta = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
    return await Flashsale.findAll({
      where: {
        start_time: {
            [Op.lte]: nowInJakarta,
        },
        end_time: {
            [Op.gte]: nowInJakarta,
        },
      },
      order: [
        ['end_time', 'ASC'],  // Urutkan berdasarkan waktu selesai (terdekat)
        ['start_time', 'ASC'],  // Urutkan berdasarkan waktu mulai (terdekat)
      ],
      include: {
        association: 'item',
        attributes: ['name', 'price', 'rating'],
        include: {
          association: 'images',
          attributes: ['url'],
        },
      },
    });
  }
  

  async findAll() {
    return await Flashsale.findAll();
  }

  async findById(id) {
    return await Flashsale.findByPk(id);
  }

  async update(id, flashSale) {
    return await Flashsale.update(flashSale, { where: { id } });
  }

  async delete(id) {
    return await Flashsale.destroy({ where: { id } });
  }
}

module.exports = FlashSaleRepository;
