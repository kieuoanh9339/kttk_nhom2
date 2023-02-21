(function () {
    console.log('Hello');

    const button = document.getElementById('btnSignUp');
    button.onclick = function () {
        const Sdt = document.querySelector('[name=SDT]').value;
        const fullname = document.querySelector('[name=fullname]').value;
        const birthday = document.querySelector('[name=birthday]').value;
        const email = document.querySelector('[name=email]').value;
        const password = document.querySelector('[name=password]').value;
        const csrfmiddlewaretoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        console.log("start bind user")

        const userData = {
            sdt: Sdt,
            ten: fullname,
            namsinh: birthday,
            email: email,
            password: password
        };

        const result = validate(userData);

        if (result.is_valid) {
            createUser(userData, csrfmiddlewaretoken)
                .then(res => {
                    console.log(res);
                    if (res.error) {
                        alert(res.message);
                    }
                    else if (res.data) {
                        alert(res.message);
                        console.log(res.data);
                    }
                    else {
                        console.log('');
                    }
                });
        } else {
            console.log(result.errors);
            alert(result.errors.join('\n'));
        }

        return false;
    }
})();


function validate(userData) {// xác thực dữ liệu người dùng nhập vào
    const errors = [];

    if (!userData.sdt || !/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(userData.sdt) ) {
        errors.push('Số điện thoại phải là số có 8 hoặc 9 chữ số');
    }

    if (!userData.ten || userData.ten.length < 6) {
        errors.push('Tên không được để trống và ít nhất 6 kí tự');
    }

    if (!userData.namsinh || !/^[0-9]{4}$/.test(userData.namsinh)) {
        errors.push('Năm sinh phải là số có 4 chữ số');
    }

    if (!userData.email || !/^[a-z0-9_\.]{6,100}@[a-z0-9_]{2,20}\.[a-z]{2,3}$/i.test(userData.email)) {
        errors.push('Email không hợp lệ');
    }

    if (!userData.password || !/^[a-z0-9_]{6,100}$/i.test(userData.password)) {
        errors.push('Mật khẩu bao gồm các kí tự a-z 0-9 và _ từ 6 đến 100 kí tự');
    }

    return {
        is_valid: errors.length === 0,
        errors: errors
    };
}


function createUser(userData, csrfmiddlewaretoken) {
    const path = '/api/auth/register/';
    console.log(userData)
    console.log(JSON.stringify(userData))
    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfmiddlewaretoken
        },
        body: JSON.stringify(userData)
    }).then(res => res.json());
}