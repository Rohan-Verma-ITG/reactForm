export const validateName = (name, lable)=>{
    if (!name.trim()) {
        return `${lable} is required.`;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return `${lable} can only contain letters and spaces.`;
    }
    return "";
}