class ReadItemById {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }

    async execute(id) {
        const item = await this.itemRepository.findById(id);
        // cek jika ada flash sale
        if (item.flashsale) {
            const moment = require("moment-timezone");
            const nowInJakarta = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
            if (nowInJakarta >= item.flashsale.start_time && nowInJakarta <= item.flashsale.end_time) {
                item.price = item.flashsale.flash_price;
            } else {
                item.flashsale = null;
            }
        }
        if (!item) {
            throw new Error("Item not found");
        }

        return item;
    }
}

module.exports = ReadItemById;
  