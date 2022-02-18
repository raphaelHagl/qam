export interface UserProps {
    name: string;
    age: number;
}

export const User = (userProps: UserProps) => {
    return (
        <div>
            {Object.entries(userProps).map(([entryName, entryValue]) => {
                return (
                    <div>
                        <label>{entryName}</label>
                        <p>{entryValue}</p>
                    </div>
                )
            })}
        </div>
    )
};

export const createUser = (userProps: UserProps) => (<User {...userProps} />);
