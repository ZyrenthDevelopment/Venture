type User = {
    global_name?: string;
    username?: string;
    discriminator?: string;
    accent_color?: string;
    avatar?: string;
    avatar_decoration_data?: any;
    banner?: string;
    banner_color?: string;
    bio?: string;
    flags?: number;
    id?: string;
    premium?: boolean | undefined;
    premium_since?: string;
    premium_type?: number;
    pronouns?: string;
    public_flags?: number;
};

export default User;