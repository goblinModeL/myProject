declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
//类型声明文件 为 TypeScript 提供 .vue 文件的类型支持