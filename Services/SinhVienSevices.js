var SinhVienServices = function () {
    this.layDanhSachSinhVien = function () {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //Đường dẫn backend
            method: 'GET' //Giao thức backend cung cấp
        });
        return promise;
    }
    this.xoaSinhVien = function (maSinhVien) {
        var promise = axios({
            url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`, //Đường dẫn backend
            method: 'DELETE'
        })
        return promise;
    }
    this.layThongTinSinhVien = function (maSinhVien) {
        var promise = axios({
            url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
            method: 'GET'
        })
        return promise;
    }

    this.capNhatThongTinSinhVien = function (maSinhVien,sinhVienUpdate) {
        var promise = axios({
            url: `http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${maSinhVien}`,
            method: 'PUT',
            data: sinhVienUpdate,
        })
        return promise;
    }
    // TÍnh năng tìm kiếm sinh viên
    this.timKiemSinhVien = function (keyword) {
        console.log('Chức năng tìm kiếm sinh viên');
        return ''
    } 

}