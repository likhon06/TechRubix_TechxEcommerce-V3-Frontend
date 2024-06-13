

export const dataLoadByEmail = async(userEmail : string) => {
    const res = await fetch(`http://localhost:5000/user/${userEmail}`, {
        next: {
            revalidate: 1
        }
    })
    const singleUserData = await res.json();
    return singleUserData;
}