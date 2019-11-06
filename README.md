# breakpoints
breakpoints

## DEBUG
```javascript
new BP([2000, function () {console.log('2000')}], [300, function () {console.log('1200')}]);
```

## OR
```javascript
p.create(900,  () => {console.log('900')});
p.create(1200, () => {console.log('1200')});
p.create(800,  () => {console.log('800')});
p.create(700,  () => {console.log('700')});
p.create(600,  () => {console.log('600')});
p.create(650,  () => {console.log('650')});
```