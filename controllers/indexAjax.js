// Khai báo Services
var svServices = new SinhVienServices();

var layThongTinSinhVien = function () {
    var promise = svServices.layDanhSachSinhVien();
    promise.then(function (result) {

        var content = '';
        for (var i = 0; i < result.data.length; i++) {
            //lấy ra từng sv từ kq server

            var sv = result.data[i];

            // Tạo đối tượng sinhVien chứa dữ liệu nó
            var sinhVien = new SinhVien();
            sinhVien.maSinhVien = sv.maSinhVien;
            sinhVien.tenSinhVien = sv.tenSinhVien;
            sinhVien.email = sv.email;
            sinhVien.diemToan = sv.diemToan;
            sinhVien.diemHoa = sv.diemHoa;
            sinhVien.diemLy = sv.diemLy;
            sinhVien.diemRenLuyen = sv.diemRenLuyen;
            sinhVien.loaiSinhVien = sv.loaiSinhVien;

            content += `<tr>
            <td>${sinhVien.maSinhVien}</td>
            <td>${sinhVien.tenSinhVien}</td>
            <td>${sinhVien.email}</td>
            <td>${sinhVien.loaiSinhVien}</td>
            <td>${sinhVien.tinhDiemTrungBinh().toFixed(2)}</td>
            <td>${sinhVien.diemRenLuyen}</td>
            <td><button class = "btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')">Xóa</button></td>
            <td><button class = "btn btn-primary mr-1" onclick="chinhSua('${sinhVien.maSinhVien}')">Chỉnh Sửa</button></td>
            </tr>`

        }
        document.getElementById('tblSinhVien').innerHTML = content;
        console.log(2);

    }).catch(function (err) {
        console.log(err.response.data)
    })
}

var chinhSua = function (maSinhVien) {
    var promise = svServices.layThongTinSinhVien(maSinhVien);

    promise.then(function (result) {
        var sinhVien = result.data;
        document.getElementById('maSinhVien').value = sinhVien.maSinhVien;
        document.getElementById('tenSinhVien').value = sinhVien.tenSinhVien;
        document.getElementById('email').value = sinhVien.email;
        document.getElementById('diemToan').value = sinhVien.diemToan;
        document.getElementById('diemLy').value = sinhVien.diemLy;
        document.getElementById('diemHoa').value = sinhVien.diemHoa;
        document.getElementById('diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.getElementById('loaiSinhVien').value = sinhVien.loaiSinhVien;
    }).catch(function (error) {

    })
}

document.getElementById('btnCapNhatSinhVien').onclick = function () {
    var sinhVienUpdate = new SinhVien()
    sinhVienUpdate.maSinhVien = document.getElementById('maSinhVien').value;
    sinhVienUpdate.tenSinhVien = document.getElementById('tenSinhVien').value;
    sinhVienUpdate.email = document.getElementById('email').value;
    sinhVienUpdate.diemToan = document.getElementById('diemToan').value;
    sinhVienUpdate.diemHoa = document.getElementById('diemHoa').value;
    sinhVienUpdate.diemLy = document.getElementById('diemLy').value;
    sinhVienUpdate.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    sinhVienUpdate.loaiSinhVien = document.getElementById('loaiSinhVien').value;

    // Gọi api cập nhật sinh viên từ BE cung cấp

    var promise = svServices.capNhatThongTinSinhVien(sinhVienUpdate.maSinhVien, sinhVienUpdate);

    promise.then(function (result) {
        console.log(result.data)
        layThongTinSinhVien();
    }).catch(function (err) {
        console.log(err.response.data);
    })

    // Xử lý cập nhật thành cong


}


layThongTinSinhVien()
// ================CHỨC NĂNG THÊM SINH VIÊN VÀO SERVERS=========================

document.getElementById('btnThemSinhVien').onclick = function () {
    // Lấy thông tin người nhập vào từ giao diện
    var sv = new SinhVien()
    sv.maSinhVien = document.getElementById('maSinhVien').value;
    sv.tenSinhVien = document.getElementById('tenSinhVien').value;
    sv.email = document.getElementById('email').value;
    sv.diemToan = document.getElementById('diemToan').value;
    sv.diemHoa = document.getElementById('diemHoa').value;
    sv.diemLy = document.getElementById('diemLy').value;
    sv.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    sv.loaiSinhVien = document.getElementById('loaiSinhVien').value;

    console.log('sinhVien', sv)
    axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',//Link BE cung cấp
        method: 'POST',//PHuong thức BE cung cấp
        data: sv //Theo định dạng BE yêu cầu
    }).then(function (result) {
        console.log("Kết quả", result.data)

        //Window.reload => Sẽ tự động load lại trang sau khi thêm
        // location.reload();
        layThongTinSinhVien();
        // Gọi lại Api lấy ds sinh viên tại đây
    }).catch(function (err) {
        console.log("Kết quả", err.response.data)
    })
}
var xoaSinhVien = function (maSinhVien) {
    // Gọi Api từ BE => Trả về promise
    var promise = svServices.xoaSinhVien(maSinhVien);
    // Dùng promise để xử lý thành công hoặc thất bại
    promise.then(function (result) {
        console.log(result.data);
        layThongTinSinhVien();
    }).catch(function (err) {
        console.log(err.response.data)
    })
}



