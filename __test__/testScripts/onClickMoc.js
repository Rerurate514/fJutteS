export function mocOnClick(element){
    const consoleSpy = jest.spyOn(console, 'log');
    element.onClick();
    expect(consoleSpy).toHaveBeenCalledWith('test');
}

export const onClickMoc = () => {
    console.log("test")
}
