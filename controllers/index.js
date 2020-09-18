
//Tạo ra mảng dữ liệu quản lý các sinh viên
var mangSinhVien = [];

var validate = new Validation();
//Định nghĩa sự kiện khi người dùng click vào nút thêm sinh viên
document.getElementById('btnThemSinhVien').onclick = function () {
    //Tạo đối tượng lưu trữ thông tin người dùng nhập vào
    var sv = new SinhVien();
    sv.maSinhVien = document.getElementById('maSinhVien').value;
    sv.tenSinhVien = document.getElementById('tenSinhVien').value;
    sv.email = document.getElementById('email').value;
    sv.diemToan = document.getElementById('diemToan').value;
    sv.diemLy = document.getElementById('diemLy').value;
    sv.diemHoa = document.getElementById('diemHoa').value;
    sv.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    sv.loaiSinhVien = document.getElementById('loaiSinhVien').value;
    //Kiểm tra đối tượng sv
    // console.log(sv);
    //Kiểm tra dữ liệu hợp lệ
    var valid = true;
    //--------------Kiểm tra rỗng--------------

    valid &= validate.kiemTraRong(sv.maSinhVien, 'Mã sinh viên', '#err_maSinhVien_ktRong') & validate.kiemTraRong(sv.tenSinhVien, 'Tên sinh viên', '#err_tenSinhVien_ktRong') & validate.kiemTraRong(sv.email, 'Email', '#err_email_ktRong') & validate.kiemTraRong(sv.diemToan, 'Điểm toán', '#err_diemToan_ktRong') & validate.kiemTraRong(sv.diemLy, 'Điểm lý', '#err_diemLy_ktRong') & validate.kiemTraRong(sv.diemHoa, 'Điểm hóa', '#err_diemHoa_ktRong') & validate.kiemTraRong(sv.diemRenLuyen, 'Điểm rèn luyện', '#err_diemRenLuyen_ktRong');
    //----------Kiểm tra tất cả là ký tự --------

    valid &= validate.kiemTraChu(sv.tenSinhVien, 'Tên sinh viên', '#err_tenSinhVien_allLetters');
    //------------Kiểm tra email ---------
    valid &= validate.kiemTraEmail(sv.email, 'Email', '#err_email_format');

    //----------Kiểm tra tất cả là số----------
    valid &= validate.kiemTraTatCaSo(sv.maSinhVien, 'Mã sinh viên', '#err_maSinhVien_allNumber') & validate.kiemTraTatCaSo(sv.diemToan, 'Điểm toán', '#err_diemToan_allNumber') & validate.kiemTraTatCaSo(sv.diemLy, 'Điểm lý', '#err_diemLy_allNumber') & validate.kiemTraTatCaSo(sv.diemHoa, 'Điểm hóa', '#err_diemHoa_allNumber') & validate.kiemTraTatCaSo(sv.diemRenLuyen, 'Điểm rèn luyện', '#err_diemRenLuyen_allNumber');

    //------------Kiểm tra độ dài--------------

    valid &= validate.kiemTraDoDai(sv.maSinhVien, 'Mã sinh viên', '#err_maSinhVien_maxMinLength', 4, 6);

    //------------Kiểm tra giá trị -----------
    valid &= validate.kiemTraGiaTri(sv.diemToan, 'Điểm toán', '#err_diemToan_maxMinValue', 1, 10) & validate.kiemTraGiaTri(sv.diemLy, 'Điểm lý', '#err_diemLy_maxMinValue', 1, 10) & validate.kiemTraGiaTri(sv.diemHoa, 'Điểm hóa', '#err_diemHoa_maxMinValue', 1, 10) & validate.kiemTraGiaTri(sv.diemRenLuyen, 'Điểm rèn luyện', '#err_diemRenLuyen_maxMinValue', 1, 10);

    //Kiểm tra định dạng của chuỗi regex
    if (!valid) {
        return;
    }

    //------------------
    mangSinhVien.push(sv);

    //Gọi hàm tạo bảng
    taoBang(mangSinhVien);

    luuLocalStorage(); //Khi mảng sv đc thêm vô thì tự động lưu vào localStrorage

}

var taoBang = function (arrSinhVien) {
    var contentTable = '';
    //Duyệt qua mảng sinhVien tạo ra các dòng tr
    for (var index = 0; index < arrSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinhVien từ trong mảng
        var sv = arrSinhVien[index];

        // Tạo Đối tượng
        var sinhVien = new SinhVien(sv.maSinhVien, sv.tenSinhVien, sv.email, sv.diemToan, sv.diemLy, sv.diemHoa, sv.diemRenLuyen, sv.loaiSinhVien);
        // sinhVien.maSinhVien = sv.maSinhVien;
        // sinhVien.tenSinhVien = sv.tenSinhVien;
        // sinhVien.email = sv.email;
        // sinhVien.diemToan = sv.diemToan;
        // sinhVien.diemHoa = sv.diemHoa;
        // sinhVien.diemLy = sv.diemLy;
        // sinhVien.diemRenLuyen = sv.diemRenLuyen;
        // sinhVien.localStorage = sv.loaiSinhVien;

        //Tạo thẻ tr + dồn vào nội dung contentTable   <td>${sv.tinhDiemTrungBinh()}</td>
        contentTable += `
            <tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.loaiSinhVien}</td> 
                <td>${sinhVien.tinhDiemTrungBinh()}</td>         
                <td>${sinhVien.diemRenLuyen}</td>
                <td><button class="btn btn-primary" onclick="chinhSuaSinhVien('${sinhVien.maSinhVien}')">Chỉnh sửa</button></td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')">Xóa</button></td>
            </tr>
        `
    }
    // console.log('contentTable', contentTable); //=> log ra chuỗi nhiều thẻ <tr></tr> chứa thông tin sinh viên
    document.getElementById('tblSinhVien').innerHTML = contentTable;
}


// =================Chỉnh sửa sinh viên=====================



var chinhSuaSinhVien = function (maSV) {

    //  Khóa mã sinh viên và ng dùng ko thể sửa

    document.getElementById('maSinhVien').disabled = true;


    // tim sv có mã sv trong mảng
    for (var index = 0; index < mangSinhVien.length; index++) {
        var sv = mangSinhVien[index];
        // Kiểm tra từng sv =>xem sv nào có mã = maSV khi click => gán lên control phía trên
        if (sv.maSinhVien === maSV) {
            document.getElementById('maSinhVien').value = sv.maSinhVien;
            document.getElementById('tenSinhVien').value = sv.tenSinhVien;
            document.getElementById('email').value = sv.email;
            document.getElementById('diemToan').value = sv.diemToan;
            document.getElementById('diemLy').value = sv.diemLy;
            document.getElementById('diemHoa').value = sv.diemHoa;
            document.getElementById('diemRenLuyen').value = sv.diemRenLuyen;
            document.getElementById('loaiSinhVien').value = sv.loaiSinhVien;
        }
    }
    // Gán tt sv tìm đc lên các control (thẻ input) phía trên


}

// --------------------Cập Nhật Sinh Viên--------------------

document.getElementById('btnCapNhatSinhVien').onclick = function () {
    var svUpdate = new SinhVien();

    svUpdate.maSinhVien = document.getElementById('maSinhVien').value;
    svUpdate.tenSinhVien = document.getElementById('tenSinhVien').value;
    svUpdate.email = document.getElementById('email').value;
    svUpdate.diemToan = document.getElementById('diemToan').value;
    svUpdate.diemLy = document.getElementById('diemLy').value;
    svUpdate.diemHoa = document.getElementById('diemHoa').value;
    svUpdate.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    svUpdate.loaiSinhVien = document.getElementById('loaiSinhVien').value;

    console.log(svUpdate);

    // Tìm svUpdate có mã trùng với maSV trong mảng =>gán dữ liệu sinhVien = svUpdate
    for (var index = 0; index < mangSinhVien.length; index++) {
        var sv = mangSinhVien[index];
        if (sv.maSinhVien === svUpdate.maSinhVien) {

            sv.email = svUpdate.email;
            sv.diemToan = svUpdate.diemToan;
            sv.diemLy = svUpdate.diemLy;
            sv.diemHoa = svUpdate.diemHoa;
            sv.diemRenLuyen = svUpdate.diemRenLuyen;
            sv.loaiSinhVien = svUpdate.loaiSinhVien;

        }
    }

    // gọi hàm tạo bảng
    taoBang(mangSinhVien);
    luuLocalStorage();
    // Clear tất các thông tin và bật lại input

    document.getElementById('maSinhVien').disabled = false;
    var mangTheInput = document.querySelectorAll('input');
    for (var i = 0; i < mangTheInput.length; i++) {
        var tagInput = mangTheInput[i];
        tagInput.value = '';
    }
}


// --------------------Xóa sinh viên-------------------------------
var xoaSinhVien = function (maSV) {
    // alert(maSV);
    //mangSinhVien là biến toàn cục khai báo phía trên đầu file
    for (var index = mangSinhVien.length - 1; index >= 0; index--) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinhVien
        var sv = mangSinhVien[index];

        //Kiểm tra từng phần tử sinhVien có mã = với maSV được click ở nút xóa hay không?
        if (sv.maSinhVien === maSV) {
            mangSinhVien.splice(index, 1); // Hàm xóa phần tử của mảng trong js, index:vị trí xóa, 1 là tại vị trí đó xóa 1 phần tử 
        }
    }
    //Sau khi xóa thì tạo lại bảng = mảng dữ liệu đã xóa
    taoBang(mangSinhVien);

    // Lưu vào localStorage sau khi xóa, dữ liệu sẽ mất luôn trong local
    luuLocalStorage();

    
}




// ===========================Lưu LocalStorage================================
var luuLocalStorage = function () {
    // Các bước lưu trữ mảng sinh viên xuống LocalStorage
    var sMangSinhVien = JSON.stringify(mangSinhVien); //Biến mảng sinh viên thành chuỗi

    // console.log('mangSinhVien', sMangSinhVien);
    // console.log('mangSinhVien', mangSinhVien);

    localStorage.setItem('mangSinhVien', sMangSinhVien);

}

var layDuLieuLocalStorage = function () {
    // Kiểm tra dữ liệu có trong localStorage chưa
    if (localStorage.getItem('mangSinhVien')) {
        // Lấy dữ liệu từ local storage (Lấy ra dữ liệu là chuỗi)
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        // Biến đổi dữ liệu từ chuỗi Json =>mảng và gán vào mảng sinh viên
        var mangSinhVienStorage = JSON.parse(sMangSinhVien);

        mangSinhVien = JSON.parse(sMangSinhVien);

        // Gọi hàm tạo bảng =>taok html
        taoBang(mangSinhVienStorage)
    }
}

// Gọi hàm localStorage
layDuLieuLocalStorage();