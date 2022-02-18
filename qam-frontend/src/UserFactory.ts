import { InstanceFactory } from './di-container';

import { User, UserProps, createUser } from './User';

export class UserFactory implements InstanceFactory<void, UserProps, typeof User> {
    propsProvider = () => ({ props: { name: 'Paul', age: 21 } });
    createComponent = () => createUser;
}