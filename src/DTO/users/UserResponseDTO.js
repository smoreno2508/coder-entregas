export default class UserResponseDTO {
    constructor(user){
        this.id = user._id;
        this.name = `${user.firstName} ${user.lastName}`
        this.email = user.email;
        this.role = user.role;
        this.cartId = user.cartId;
        this.isGithub = user.isGithub;
        this.last_connection = user.last_connection;
        this.documents = user.documents;

    }

    static fromModel(user){
        return new UserResponseDTO(user);
    }
}