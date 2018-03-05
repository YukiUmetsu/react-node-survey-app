/**
 * Created by yukiX on 2018/03/04.
 */

class util {
    static trimLeft(target, charlist) {
        // eslint-disable-next-line
        if (charlist === undefined) {charlist = "\s"};
        return target.replace(new RegExp("^[" + charlist + "]+"), "");
    };

    static trimRight(target, charlist) {
        // eslint-disable-next-line
        if (charlist === undefined) charlist = "\s";
        return target.replace(new RegExp("[" + charlist + "]+$"), "");
    };

    static trimCustom(target, charlist) {
        return this.trimLeft(target, charlist).trimRight(target, charlist);
    };
}

export default util;