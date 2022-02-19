import { createUser } from './User';

export const UserComponentFactory = {
    contextProvider: { props: { name: 'Paul', age: 21 } },
    createComponent: () => createUser,
};
