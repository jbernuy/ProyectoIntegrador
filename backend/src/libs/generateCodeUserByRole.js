import User from '../models/User';

export default async(role, codeDegree) => {
    const TOTAL_PER_ROLE = await User.countDocuments({ role: role });
    const ANIO_ACTUAL = new Date().getFullYear();
    let fullCode = '';
    switch (role) {
        case 'alumno':
            fullCode = generateString(`ES${ANIO_ACTUAL}-${codeDegree}-`, TOTAL_PER_ROLE)
            break;
        case 'docente':
            fullCode = generateString(`DC${ANIO_ACTUAL}-${codeDegree}-`, TOTAL_PER_ROLE)
            break;
        default:
            fullCode = `admin${TOTAL_PER_ROLE+1}`
            break;
    }
    return fullCode;
}

function generateString(baseCode, total) {
    if (total >= 0 && total < 9) {
        return `${baseCode}000${total+1}`;
    } else if (total >= 10 && total < 99) {
        return `${baseCode}00${total+1}`;
    } else if (total >= 100 && total < 999) {
        return `${baseCode}0${total+1}`;
    } else {
        return `${baseCode}${total+1}`;
    }
}