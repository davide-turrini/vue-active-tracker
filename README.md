<h1 align="center">Vue Active Tracker</h1>
<p align="center">A Vue.js scroll sensor component useful to activate your nav links</p>

## What are we talking about

This component simply let you change the class of your nav links depending on what element is in the view right now. This component should wrap you navigation and every link should have a reference a section of interest. See examples below..

## How to install

```
npm install vue-active-tracker
```

## How to use

```js
import App from './App.vue';
import VActiveTracker from 'vue-active-tracker';
import Vue from 'vue';

Vue.use(VActiveTracker);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

or <b>without plugin initialization</b>... 
```vue
<template>
    <v-active-tracker>
        <nav>
            <ul>
                <li>
                    <a href="#first">First link</a>
                </li>
                <li>
                    <a href="#second">Second link</a>
                </li>
                <li>
                    <a href="#third">Third link</a>
                </li>
            </ul>
        </nav>
    </v-active-tracker>


    ...

    <section id="first">
        First section
    </section>

    <div id="second">
        Second section
    </div>

    <footer id="third">
        Third section
    </footer>
</template>

<script>
import VActiveTracker from 'vue-active-tracker';

export default { 
  component: {
    VActiveTracker
  }
}
</script>
```

### Props


- ### link-selector <p>it is the selector used for finding nav links</p>
  -  type: `String`, 
  -  default: `a`

        Define the selector used to find links (the search is limited for those links defined inside this component). See CSS selectors for more info. Examples: a, a.link, button[data=foo], ...
- ### active-class
  -  type: `String`, 
  -  default: `is-active`

        Define which class (or classes) should be added when the link becomes active.
- ### trigger
  -  type: `String`, 
  -  default: `top`
        
        Define where do you want to place your trigger.. Possible values are the following
        - `top` <p>set the trigger at the top of the screen view (it is equivalent to 0% or 0)</p>
        - `middle` <p>set the trigger at the vertical center of the screen view (its is equivalent to 50%)</p>
        - `bottom` <p>set the trigger at the bottom of the screen view (its is equivalent to 100%)</p>
        - `{number}px` <p>set the trigger {number} pixel from the top. Examples: `100px`, `40px`, `10px`, ...</p> 
        - `{number}` <p>equivalent of {number}px. Examples: `100`, `40`, `10`, ...</p>
        - `{percentage}%` <p>set the trigger {percentage} percentage from the top where 0% means top and 100% means bottom. Examples: `10%`, `20%`, `30%`, ...</p>
- ### auto-start
  -  type: `Boolean`, 
  -  default: `true`  

        When set to true the componets gets updated even when it is mounted the first time. Otherwise it will only update automatically when you resize window. You should always let this prop true.
  
### Methods
- ### update()

    Use this method to re-bind links and sections as they are added to the DOM. The component, however, will auto udate whenever the page get resized.
         

### Doubts ?

- ### Doesn't work with conditionally displayed links

    Try by using the `update` method after having added the link you want to the page.

## License

MIT @ Davide Turrini [(davide-turrini)](https://github.com/davide-turrini)