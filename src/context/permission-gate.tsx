
const useGetUserPermissions = () => {
    // logica pegar permissions
    return ['admin']
}


const PermissionGate = ({children, permissions}) => {
    const userPermissions = useGetUserPermissions()
   
    console.log(typeof(permissions))
    // eu to dando um some no userPermissions, porém o ideial seria dar um some no 'permissions' que vem de parametro, pois o userpermission vai ter uma permissao só (admin ou comercial ou financeiro), ja o permissions q vem em parametros pode ter duas pois o admin tem acesso a tudo, seria admin + fnanceiro ou comercial
    const userHasPermission = userPermissions.some(item => {
        if(permissions == item) {
            return true
        }
    })

    if(userHasPermission == true) {
        return children
    } 

    return null
}


export default PermissionGate