import { create } from "zustand";
import {checkTokenAPI} from "@/component/api/siteAPI";


const useUserStore = create((set, get) => {



	return {
		id: null,
		name: null,
		mail: null,
		local: null,
		// Проверить токен и загрузить данные пользователя
		check: async () => {
			const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
			if (!token) {
				set({ id: null, name: null, mail: null });
				return;
			}
			try {
				const data =  await  checkTokenAPI(token)
				if (data.id) {
					set({ id: data.id, name: data.name, mail: data.mail, local: data.local });
				} else {
					//localStorage.removeItem("token");
					set({ id: null, name: null, mail: null });
				}
			} catch (error) {
				console.error("Ошибка проверки токена:", error.message);
				localStorage.removeItem("token");
				set({ id: null, name: null, mail: null });
			}
		},

		// Выйти из системы
		logout: () => {
			localStorage.removeItem("token");
			set({ id: null, name: null, mail: null });
		},
	};
});

export default useUserStore;
