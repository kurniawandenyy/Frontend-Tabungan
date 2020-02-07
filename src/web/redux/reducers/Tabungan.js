const initialState = {
    data: [],
    jmlPemasukan: 0,
    jmlPengeluaran: 0,
    total: 0,
    isLoading: false,
    isError: false,
    message: ''
}

const Tabungan = (state= initialState, action) =>{
    switch(action.type){
        case "ADD_TABUNGAN_PENDING":
            case "GET_TABUNGAN_PENDING":
                case "DELETE_TABUNGAN_PENDING":
                    case "UPDATE_TABUNGAN_PENDING":
                        return{
                            ...state,
                            isError: false,
                            isLoading: true
                        }
        case "ADD_TABUNGAN_FULFILLED":
            case "UPDATE_TABUNGAN_FULFILLED":
                case "DELETE_TABUNGAN_FULFILLED":
                    return{
                        ...state,
                        message: 'Success!',
                        isError: false,
                        isLoading: false
                    }
        case "GET_TABUNGAN_FULFILLED":
            return{
                ...state,
                data: action.payload.data.result.result,
                jmlPemasukan: action.payload.data.result.jmlPemasukan,
                jmlPengeluaran: action.payload.data.result.jmlPengeluaran,
                total: action.payload.data.result.total,
                isError: false,
                isLoading: false
            }
        case "ADD_TABUNGAN_REJECTED":
            case "GET_TABUNGAN_REJECTED":
                case "DELETE_TABUNGAN_REJECTED":
                    case "UPDATE_TABUNGAN_REJECTED":
                        return{
                            ...state,
                            isError: true,
                            isLoading: false
                        }
        default:
            return state
    }
}

export default Tabungan