import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './qris.css';

function PaymentDetail() {
  return (
    <div className="container">
      <div className="title">
        <i className="fas fa-map-marker-alt"></i>
        Detail Pembayaran
      </div>
      <div className="content">
        <div className="box">
          <h3>Ringkasan yang harus dibayarkan</h3>
          <table>
            <tr>
              <td>Total belanja Anda</td>
              <td>Rp. 121.000</td>
            </tr>
            <tr>
              <td>Biaya Ongkos Kirim</td>
              <td>Rp. 20.000</td>
            </tr>
            <tr>
              <td>Total yang harus dibayar</td>
              <td>Rp. 141.000</td>
            </tr>
          </table>
        </div>
        <div className="box">
          <h3>Metode Pembayaran</h3>
          <div className="highlight">
            <p>QRIS</p>
            <p>Rp. 141.000</p>
          </div>
        </div>
      </div>
      <div className="payment-box box">
        <h3>Central Java</h3>
        <div className="timer">
          Selesaikan pembayaran dalam <strong>14m 45s</strong>
        </div>
        <img
          alt="QR Code Pembayaran Nasional"
          height="200"
          src="/images/main_image.png"
          width="200"
        />
        <div className="total">
          Total Pembayaran
          <br />
          Rp. 141.000
        </div>
        <button className="btn">Cek Status Pembayaran</button>
      </div>
    </div>
  );
}

export default PaymentDetail;
