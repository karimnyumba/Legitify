import {createStore} from 'vuex'
import {InstitutionStore} from "@/store/modules/Institution/Institution.store";
import {UserStore} from "@/store/modules/User/User.store";
import {DocumentStore} from "@/store/modules/Documents/Document.store";
import {DocumentSharesStore} from "@/store/modules/Documents/DocumentShares.store";

export default createStore({
    state: {
        isLoading: false,
        activeNav: ''
    },
    getters: {
        getLoadingStatus(state) {
            return state.isLoading
        },
        getActiveNav(state) {
            return state.activeNav
        }
    },
    mutations: {
        setLoadingStatus(state, status) {
            state.isLoading = status
        },
        setActiveNav(state, nav) {
            state.activeNav = nav
        }
    },
    actions: {
        setLoadingStatus(context, status) {
            context.commit('setLoadingStatus', status)
        },
        setActiveNav(context, nav) {
            context.commit('setActiveNav', nav)
        }
    },
    modules: {
        InstitutionStore,
        UserStore,
        DocumentStore,
        DocumentSharesStore
    }
})
