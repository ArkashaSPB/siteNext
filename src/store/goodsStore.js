import { create } from 'zustand';
import { getGoodsAPI } from "@/component/api/siteAPI";

const useGoodsStore = create((set, get) => ({
	goods: [],
	filteredGoods: [],
	categories: [],
	countries: [],
	items: [],
	isLoaded: false,

	loadGoods: async () => {
		if (get().isLoaded) return; // Предотвращаем повторную загрузку
		set({ isLoaded: true, loading: true });
		const res = await getGoodsAPI();
		const goodsWithQuantity = (res.goods || []).map((item) => ({
			...item,
			quantity: item.available > 0 ? 1 : 0, // Добавляем поле quantity с проверкой available
		}));

		set({
			goods: goodsWithQuantity,
			filteredGoods: goodsWithQuantity,
			categories: res.category || [],
			countries: res.country || [],
			loading: false
		});
	},

	filterGoods: (category, country) => {
		set((state) => {
			let filtered = state.goods;
			if (category) {
				filtered = filtered.filter((item) => item.category === category);
			}
			if (country) {
				filtered = filtered.filter((item) => item.country === country);
			}
			return { filteredGoods: filtered };
		});
	},

	addItem: (item) => {
		set((state) => {
			const existingItem = state.items.find((i) => i.id === item.id);
			if (existingItem) {
				const newQuantity = Math.min(existingItem.quantity + 1, existingItem.available); // Проверяем, чтобы quantity не превышал available
				return {
					items: state.items.map((i) =>
						i.id === item.id ? { ...i, quantity: newQuantity } : i
					)
				};
			}
			return {
				items: [...state.items, { ...item, quantity: Math.min(1, item.available) }], // Учитываем available при добавлении нового товара
			};
		});
	},

	updateItemQuantity: (id, quantity) => {
		set((state) => {
			const updatedGoods = state.goods.map((item) => {
				if (item.id === id) {
					const newQuantity = Math.min(Math.max(0, quantity), item.available); // Ограничиваем значение в пределах [0, available]
					return { ...item, quantity: newQuantity };
				}
				return item;
			});

			// Обновляем filteredGoods на основе новых goods
			const updatedFilteredGoods = state.filteredGoods.map((item) => {
				if (item.id === id) {
					const newQuantity = Math.min(Math.max(0, quantity), item.available);
					return { ...item, quantity: newQuantity };
				}
				return item;
			});

			return { goods: updatedGoods, filteredGoods: updatedFilteredGoods };
		});
	},
}));

export default useGoodsStore;