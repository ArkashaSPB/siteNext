import { create } from "zustand";

const useCartStore = create((set, get) => ({
	items: [], // товары в корзине
	totalQuantity: 0, // общее количество товаров
	totalPrice: 0, // общая сумма
	activePromo: null, // текущий активный промокод

	initializeCart: () => {
		if (typeof window !== "undefined") {
			const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
			set({
				items: savedCart.items || [],
				totalQuantity: savedCart.totalQuantity || 0,
				totalPrice: savedCart.totalPrice || 0,
				activePromo: savedCart.activePromo || null,
			});
		}
	},

	applyPromo: (promo) => {
		set((state) => {
			const updatedItems = state.items.map((item) => {
				const promoItem = promo.product.find((p) => p.id === item.id);
				if (promoItem) {
					return {
						...item,
						oldPrice: item.price,
						price: promoItem.price, // применяем новую цену
					};
				}
				return item;
			});

			const newState = {
				items: updatedItems,
				activePromo: promo,
			};

			localStorage.setItem("cart", JSON.stringify(newState));
			return newState;
		});

		get().chet(); // Обновляем сумму и количество
	},

	// Добавить товар в корзину с учетом промокода
	addItem: (item) => {
		set((state) => {
			const existingItem = state.items.find((i) => i.id === item.id);
			let updatedItems;

			// Проверяем, есть ли товар в активном промокоде
			const promoItem = state.activePromo?.product.find((p) => p.id === item.id);

			if (existingItem) {
				updatedItems = state.items.map((i) =>
					i.id === item.id
						? {
							...i,
							quantity: Math.min(i.quantity + item.quantity, item.available),
						}
						: i
				);
			} else {
				updatedItems = [
					...state.items,
					{
						...item,
						quantity: Math.min(item.quantity, item.available),
						oldPrice: promoItem ? item.price : null,
						price: promoItem ? promoItem.price : item.price,
					},
				];
			}

			const newState = { items: updatedItems };

			localStorage.setItem("cart", JSON.stringify({ ...state, ...newState }));

			return newState;
		});

		get().chet();
	},

	removeItem: (id) => {
		set((state) => {
			const updatedItems = state.items.filter((i) => i.id !== id);

			const newState = { items: updatedItems };

			localStorage.setItem("cart", JSON.stringify({ ...state, ...newState }));

			return newState;
		});

		get().chet();
	},

	updateItemQuantity: (id, quantity) => {
		set((state) => {
			const updatedItems = state.items.map((item) => {
				if (item.id === id) {
					const newQuantity = Math.max(1, quantity);
					return { ...item, quantity: newQuantity };
				}
				return item;
			});

			const newState = { items: updatedItems };

			localStorage.setItem("cart", JSON.stringify({ ...state, ...newState }));

			return newState;
		});

		get().chet();
	},

	chet: () => {
		set((state) => {
			const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
			const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

			const newState = { totalQuantity, totalPrice };

			localStorage.setItem("cart", JSON.stringify({ ...state, ...newState }));

			return newState;
		});
	},

	clearCart: () => {
		set(() => {
			const newState = {
				items: [],
				totalQuantity: 0,
				totalPrice: 0,
				activePromo: null,
			};

			localStorage.setItem("cart", JSON.stringify(newState));

			return newState;
		});
	},
}));

export default useCartStore;