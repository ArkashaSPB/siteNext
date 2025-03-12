import {$host} from "./index.js";


export const getGoodsAPI = async () => {
	const {data} = await $host.get(`goods/client`)
	return data
}



export const authUserAPI = async (massive) => {
	const {data} = await $host.post(`users/auth`, massive)
	return data
}


export const getPassAPI = async (massive) => {
	const {data} = await $host.patch(`users/auth`, massive)
	return data
}


export const regUserAPI = async (massive) => {
	const {data} = await $host.post(`users/reg`,massive)
	return data
}

export const checkTokenAPI = async (token) => {
	const {data} = await $host.get(`users/check/`+token)
	return data
}


export const addOrderAPI = async (massive) => {
	const {data} = await $host.post(`goods/order`,massive)
	return data
}



//получение заказов по пользователю
export const getOrderIdAPI = async (id) => {
	const {data} = await $host.get(`users/orders/`+id)
	return data
}



export const getOrderOneIdAPI = async (id) => {
	const {data} = await $host.get(`goods/order/`+id)
	return data
}


export const getSettingAPI = async (id) => {
	const {data} = await $host.get(`setting`)
	return data
}

export const addOplataAPI = async (id) => {
	const {data} = await $host.post(`goods/order/oplata/`+id)
	return data
}

export const editOplataAPI = async (id) => {
	const {data} = await $host.patch(`goods/order/oplata/`+id)
	return data
}

export const getPromoAPI = async (name) => {
	const {data} = await $host.get(`goods/promo/` + name)
	return data
}

export const getAllLangAPI = async () => {
	const {data} = await $host.get(`lang` )
	return data
}