import { useContext } from "react"
import { AuthContext } from "./auth"



const useGetUserPermissions = () => {
    const {role} = useContext(AuthContext)
 
    // logica pegar permissions
    return role
}


export const PermissionGateRender = ({children, permissions}) => {
    const userPermissions = useGetUserPermissions()

   
    // vendo se as permissões recebidas pela função existem nas permissões do usuario
    const userHasPermissionToRender = permissions.some(item => {
        if(item == userPermissions) {
            return true
        }
    })

    // se existirem, retornar o elemento
    if(userHasPermissionToRender == true) {
        return children
    } 
    return null
}





export const PermissionGateRoutes = (permissions) => {
    const userPermissions = useGetUserPermissions()
   

    const userHasPermissionToAcessRoute = permissions.some(item => {
        if(item == userPermissions){
            return true
        } 
    })  

    if (userHasPermissionToAcessRoute == true) {
        return true
    }

    return false
}



