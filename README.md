# Slick Slider React
Horizontal Items Slider for React

## Basic Usage

```jsx
import Slider from "slick-slider-react"

function App() {
  const [index, setIndex] = useState(0)
  return (
    <Slider index={index} onSlide={setIndex}>
      <div className="w-[200px] h-[100px]">1</div>
      <div className="w-[200px] h-[100px]">2</div>
      <div className="w-[200px] h-[100px]">3</div>
      <div className="w-[200px] h-[100px]">4</div>
    </Slider>
  )
}
```

## Slider Options

Following options can be provided to the `<Slider>` component to change it's default configuration.

`index`, `onSlide` and `children` are required.

| Option       | Type                    |  Default | Description                                                                             |
| ------------ | ----------------------- | :------: | --------------------------------------------------------------------------------------- |
| index        | `number`                |          | Current slide index                                                                     |
| onSlide      | `method`                |          | Slide index change callback                                                             |
| children     | `JSX.Element[]`         |          | All child elements                                                                      |
| alignment    | `left` `center` `right` | `center` | Alignment of the items when they snap                                                   |
| snap         | `boolean`               | `true`   | Slider will snap to closest item or otherwise slider will stay same after dragging      |
| snapDuration | `number`                | `400`    | Animation duration when slider snaps to closest item                                    |
| snapOutbound | `boolean`               | `false`  | Slider will snap according to alignment even for items in the corners                   |
| draggable    | `boolean`               | `true`   | User will be able to drag the slider or otherwise slider will only snap by index change |
| dragCallback | `boolean`               | `true`   | Slide index will callback out of the component while user dragging the slider           |
| dragOutbound | `boolean` `number`      | `true`   | User will be able to drag slider to out of container by this amount                     |
| dragFactor   | `number`                |  `30`    | Adjust the acceleration of snap items after dragging                                    |
| className    | `string`                |          | Custom class name for slider container                                                  |

## Slider Items Gaps and Side Gaps

Slider component is a `flex` element. Therefore, providing a CSS flex `gap` using any custom `className` to the component options is enough to make space between each items. Also use `padding` in x direction to make space in left and right sides.

Look at the following syntax written in tailwind CSS.

```jsx
<Slider className="gap-4 px-4">
  ...
</Slider>
```

## Switch to No-Slider Mode

If you need to make the slider items appear as normal list of elements without sliding effect, you can put `no-slider` as the `css-content` on slider style using css `@media` rule. This rule will be checked when window resizes.

Look at the following syntax written in tailwind CSS.

```jsx
<Slider className="lg:content-['no-slider']">
  ...
</Slider>
```

### Developed by Deshan Nawanjana

[Home](https://deshan.lk/)
&ensp;|&ensp;
[DNJS](https://dnjs.info/)
&ensp;|&ensp;
[LinkedIn](https://www.linkedin.com/in/deshan-nawanjana/)
&ensp;|&ensp;
[GitHub](https://github.com/deshan-nawanjana)
&ensp;|&ensp;
[YouTube](https://www.youtube.com/channel/UCfqOF8_UTa6LhaujoFETqlQ)
&ensp;|&ensp;
[Blogger](https://dn-w.blogspot.com/)
&ensp;|&ensp;
[Facebook](https://www.facebook.com/mr.dnjs)
&ensp;|&ensp;
[Gmail](mailto:deshan.uok@gmail.com)
