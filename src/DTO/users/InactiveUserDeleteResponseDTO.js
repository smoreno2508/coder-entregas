export default class InactiveUserDeleteResponseDTO {
    constructor(user){
        
        this.deleteUserQuantity = user.deleteUserQuantity;
        this.emails = user.emails;
    }
}