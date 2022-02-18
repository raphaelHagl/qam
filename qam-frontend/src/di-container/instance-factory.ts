import React from "react";
import { MaybeComputed, evaluateMaybeComputed } from "../utils";

export interface ComponentPropsContext<TComponentContextType = void, TComponentProps = void> {
    type?: TComponentContextType;
    props: TComponentProps;
}

export type Component<TComponentProps = void> = React.FunctionComponent<TComponentProps> | React.ComponentClass<TComponentProps> | string;

export interface InstanceFactory<
    TComponentContextType,
    TComponentProps,
    TComponent extends Component<TComponentProps>,
    > {
    propsProvider: MaybeComputed<ComponentPropsContext<TComponentContextType, TComponentProps>>;
    createComponent: () => TComponent;
}

export const instantiateComponent = async <
    TComponentContextType,
    TComponentProps,
    TComponent extends Component<TComponentProps>,
    >(instanceFactory: InstanceFactory<TComponentContextType, TComponentProps, TComponent>) => {

    const { propsProvider, createComponent } = instanceFactory;
    const componentPropsContext = await evaluateMaybeComputed(propsProvider);

    const component = createComponent();
    return React.createElement(component, componentPropsContext.props);
};