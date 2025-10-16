function omitPassword(user: any) {
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
}

export default omitPassword