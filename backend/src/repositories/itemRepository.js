const { Item, ImageItem, Category, Flashsale } = require("../infrastructure/models");
const { Op } = require("sequelize");

class ItemRepository {
    async create(itemData, imageUrls) {
        const item = await Item.create(itemData);
        const images = imageUrls.map((url) => ({ item_id: item.id, url }));
        await ImageItem.bulkCreate(images);
        return item;
    }
    
    async findAll(filters, order, categoryId, search, take) {
        return await Item.findAll({
            where: {
                ...filters,
                ...(categoryId && { category_id: categoryId }),  // Menyaring berdasarkan category_id jika ada
                ...(search && { 
                    name: { 
                        [Op.like]: `%${search.toLowerCase()}%`  // Pencarian case-insensitive di MySQL menggunakan LIKE
                    }
                }),
            },
            limit: take,
            order: order,  // Menggunakan parameter order yang diberikan
            include: [
                {
                    model: ImageItem,  // Menginclude ImageItem dalam query
                    as: 'images'  // Pastikan alias yang sesuai
                },
                {
                    model: Category,  // Menginclude Category dalam query
                    as: 'category'  // Pastikan alias yang sesuai
                },
                {
                    model: Flashsale,  // Menginclude Flashsale dalam query
                    as: 'flashsale',  // Pastikan alias yang sesuai
                    attributes: ['id', 'start_time', 'end_time', 'flash_price'],  // Hanya ambil kolom yang dibutuhkan
                }
            ]
        });
    }
    
    
    async findById(id) {
        const moment = require("moment-timezone");

        const nowInJakarta = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
        console.log("NOW IN JAKARTA", nowInJakarta);
        return await Item.findByPk(id, {
            include: [
                {
                    model: ImageItem,
                    as: 'images',
                },
                {
                    model: Category,
                    as: 'category',
                },
                {
                    model: Flashsale,
                    as: 'flashsale',
                    attributes: ['id', 'start_time', 'end_time', 'flash_price'], // Hanya ambil kolom yang dibutuhkan
                    required: false, // Menjadikan relasi ini opsional
                    where: {
                        start_time: {
                            [Op.lte]: nowInJakarta,
                        },
                        end_time: {
                            [Op.gte]: nowInJakarta,
                        },
                    }
                },
            ],
        });
    }
    
    
    async update(id, updateData, imageUrls) {
        await Item.update(updateData, { where: { id } });
        if (imageUrls !== null && imageUrls.length > 0) {
            await ImageItem.destroy({ where: { item_id: id } });
            const images = imageUrls.map((url) => ({ item_id: id, url }));
            await ImageItem.bulkCreate(images);
        }
        return await this.findById(id);
    }
    
    async delete(id) {
        return await Item.destroy({ where: { id } });
    }

    async decrementStock(itemId, qty) {
        return await Item.decrement('stock', { by: qty, where: { id: itemId } });
    }

    async incrementPoint(itemId, qty) {
        return await Item.increment('points', { by: qty, where: { id: itemId } });
    }

    async incrementCountSold(itemId, qty) {
        qty = parseInt(qty);
        const item = await this.findById(itemId);
        console.log("UPDATE COUNT SOLD", item.count_sold + qty);
        return await Item.update({ count_sold: item.count_sold + qty }, { where: { id: itemId } });
    }

    async updateRating(itemId, rating) {
        return await Item.update({ rating }, { where: { id: itemId } });
    }
}

module.exports = ItemRepository;
