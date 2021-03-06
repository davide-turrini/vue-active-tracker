import Vue, { PluginFunction, VueConstructor } from 'vue';

declare const VueActiveTracker: VueConstructor<Vue> & { install: PluginFunction<any>; };
export default VueActiveTracker;
