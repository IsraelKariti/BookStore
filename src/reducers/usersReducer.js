export const usersInitialState = {
    id: 0,
    firstName: "Israel",
    lastName: "Kariti",
    dob: new Date(1,2,2003),
    email: '',
    phone: '',
    signUpDate: '',
    lastSignIn: '',
}

export const usersReducer = (state, action)=>{
    switch(action.type){
        case "ADD":
            return [...state, action.user];
        case "REMOVE":
            const filteredUsers = state.filter((user)=>user.id !== action.id);
            return filteredUsers;
        case "EDIT":
            const editedUsers = state.map((user)=>{
                if(user.id !== action.id)
                    return user;
                else 
                    return action.user;
            });
            return editedUsers;
        default:
            return state;
    }
}