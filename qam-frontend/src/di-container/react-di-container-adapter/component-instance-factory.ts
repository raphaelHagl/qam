import React from "react";
import { MaybeComputed, evaluateMaybeComputed } from "../../utils";

// TODO: move this type to the generic di container implementation and derive from that here
export interface ComponentContext<TComponentContextType = void, TComponentProps = void> {
    type?: TComponentContextType;
    props: TComponentProps;
}

export type Component<TComponentProps = void> = React.FunctionComponent<TComponentProps> | React.ComponentClass<TComponentProps> | string;

export interface ComponentInstanceFactory<
    TComponentContextType,
    TComponentProps,
    TComponent extends Component<TComponentProps>,
    > {
    contextProvider: MaybeComputed<ComponentContext<TComponentContextType, TComponentProps>>;
    createComponent: () => TComponent;
}

export const instantiateComponent = async <
    TComponentContextType,
    TComponentProps,
    TComponent extends Component<TComponentProps>,
    >(instanceFactory: ComponentInstanceFactory<TComponentContextType, TComponentProps, TComponent>) => {

    const { contextProvider: propsProvider, createComponent } = instanceFactory;
    const componentPropsContext = await evaluateMaybeComputed(propsProvider);

    const component = createComponent();
    return React.createElement(component, componentPropsContext.props);
};