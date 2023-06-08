import { createContext,useContext,useState,useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
    isLogin: false,
    uid:'',
    email:'',
    name:'',
    wallet:[{
           walletname:'Metamask',
           walletaddress:''
        },
        {
            walletname:'Trust Wallet',
            walletaddress:''
        }]
};

const reducer = (state, action) =>{
    switch (action.type) {
        case 'user_login':
            return {
                ...state,
                isLogin: action.payload,
                uid:action.uid,
                email:action.email,
            };
        case 'user_logout':
            return{
                isLogin: action.payload,
            };
        case 'save_address':
            return{
                ...state,
                wallet: state.wallet.map(it=>it.walletname === action.walletname ? {...it, walletaddress: action.walletaddress} : it)
            }
        default:
            state;
    }
}

const AuthProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;