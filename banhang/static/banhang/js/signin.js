(function () {
    console.log('Hello!');

    const btnLogin = document.getElementById('btnLogin'); // lay cai button login

    btnLogin.onclick = function () {
        const sdt = document.querySelector('[name=sdt]').value;  // lay cai input studentID
        const password   = document.querySelector('[name=password]').value; // lay cai input password

        if (sdt === '' || password === '') {
            alert('Vui lòng nhập đầy đủ thông tin!');
        } else {
            const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value; // ma bao mat form
            login({
                sdt, password
            }, csrf_token).then(response => {
                if (response.data) { // neu dang nhap thanh cong
                    alert("Dang nhap thanh cong!");
                    window.location.href = '/home';
                } else { // neu dang nhap that bai
                    console.log(response.data);
                    alert("Dang nhap that bai!");
                }
                
            });
        }
        return false;
    }
})();


function login(userData, csrf_token) {  // ham dang nhap, gui thong tin len server de xu ly dang nhap va tra ve ket qua
    const path = '/api/auth/login/';
    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf_token
        },
        body: JSON.stringify(userData)
    }).then(response => {
        return response.json();
    });
}