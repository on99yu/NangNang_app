import { createContext,useContext,useState,useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
    isLogin: false,
    uid:'',
    email:'',
    name:'',
    wallet:[{
           id : "metamask",
           walletname:'Metamask',
           walletaddress:'',
           seleted: false,
        },
        {
            id: "trustwallet",
            walletname:'Trust Wallet',
            walletaddress:'',
            seleted: false,
        },
        {
            id: "walletconnect",
            walletname:'WalletConnect',
            walleraddress:'',
            selected: false,
        },
        {
            id: "blockstreamgreen",
            walletname:'Blockstream Green',
            walleraddress:'',
            selected: false,
        },
        {
            id: "bluewallet",
            walletname:'Blue Wallet',
            walleraddress:'',
            selected: false,
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
                ...state,
                isLogin: action.payload,
            };
        case 'save_address':
            return{
                ...state,
                wallet: state.wallet.map(it => (it.id === action.id? {...it, walletaddress: action.walletaddress} : it))
            }
        case 'initialization_address':
            return {
                ...state,
                wallet: state.wallet.map(it =>(it.id === action.id? {...it, walletaddress: ''} : it) )
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