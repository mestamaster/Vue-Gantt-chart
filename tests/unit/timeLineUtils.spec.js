/* eslint-disable */
var func = require("../../src/utils/timeLineUtils");
import dayjs from "dayjs";
import { expect } from "chai";

describe("测试timeLineUtils.js", function() {
  describe("测试calcScalesAbout2Times函数", function() {
    it("相同时间 计算结果为1", function() {
      expect(
        func.calcScalesAbout2Times("2018-10-10 10:00:00", "2018-10-10 10:00:00")
      ).to.be.equal(1);
    });

    it("start 在 end 之后 报错", function() {
      expect(() =>
        func.calcScalesAbout2Times(
          "2018-10-12 10:00:00",
          "2018-10-10 10:00:00",
          11
        )
      ).to.throw("错误的参数顺序");
    });

    it("数据测试1", function() {
      expect(
        func.calcScalesAbout2Times(
          "2018-10-10 09:59:59",
          "2018-10-10 11:00:00",
          10
        )
      ).to.equal(8);
    });

    it("数据测试2", function() {
      expect(
        func.calcScalesAbout2Times(
          "2018-10-10 00:00:00",
          "2018-10-10 11:00:00",
          60
        )
      ).to.equal(12);
    });

    it("数据测试3", function() {
      expect(
        func.calcScalesAbout2Times(
          "2018-10-10 10:00:00",
          "2018-10-11 00:00:00",
          60
        )
      ).to.equal(15);
    });

    it("数据测试4", function() {
      expect(
        func.calcScalesAbout2Times(
          "2018-10-10 00:00:00",
          "2018-10-11 00:00:00",
          60
        )
      ).to.equal(25);
    });
    it("数据测试5", function() {
      expect(
        func.calcScalesAbout2Times(
          "2018-10-10 00:00:00",
          "2018-10-10 01:00:10",
          1
        )
      ).to.equal(61);
    });
  });

  describe("测试getBeginTimeOfTimeLine函数", function() {
    it("测试数据1", function() {
      expect(
        func.getBeginTimeOfTimeLine(dayjs("2018-10-11 00:00:00"), 60)
      ).to.be.equal(dayjs("2018-10-11 00:00:00").valueOf());
    });

    it("测试数据2", function() {
      expect(
        func.getBeginTimeOfTimeLine(dayjs("2018-10-11 00:00:00"), 3)
      ).to.be.equal(dayjs("2018-10-11 00:00:00").valueOf());
    });

    it("测试数据3", function() {
      expect(
        func.getBeginTimeOfTimeLine(dayjs("2018-10-11 00:04:00"), 3)
      ).to.be.equal(dayjs("2018-10-11 00:03:00").valueOf());
    });

    it("测试数据4", function() {
      expect(
        func.getBeginTimeOfTimeLine(dayjs("2018-10-11 01:11:00"), 10)
      ).to.be.equal(dayjs("2018-10-11 01:10:00").valueOf());
    });
  });

  describe("测试getEndTimeOfTimeLine函数", function() {
    it("测试数据1", function() {
      expect(
        func.getEndTimeOfTimeLine(dayjs("2018-10-11 00:00:00"), 60)
      ).to.be.equal(dayjs("2018-10-11 01:00:00").valueOf());
    });

    it("测试数据2", function() {
      expect(
        func.getEndTimeOfTimeLine(dayjs("2018-10-11 00:00:00"), 3)
      ).to.be.equal(dayjs("2018-10-11 00:03:00").valueOf());
    });

    it("测试数据3", function() {
      expect(
        func.getEndTimeOfTimeLine(dayjs("2018-10-11 00:04:00"), 3)
      ).to.be.equal(dayjs("2018-10-11 00:06:00").valueOf());
    });

    it("测试数据4", function() {
      expect(
        func.getEndTimeOfTimeLine(dayjs("2018-10-11 01:11:00"), 10)
      ).to.be.equal(dayjs("2018-10-11 01:20:00").valueOf());
    });
  });

  describe("测试validateScale函数", function() {
    it("空值异常", function() {
      expect(() => func.validateScale()).to.throw();
    });

    it("null 值", function() {
      expect(() => func.validateScale(null)).to.throw();
    });

    it("undefined 值", function() {
      expect(() => func.validateScale(undefined)).to.throw();
    });

    it("异常scale 值报错", function() {
      expect(() => func.validateScale()).to.throw();
    });

    it("正常值", function() {
      expect(func.validateScale(1)).to.be.true;
    });

    it("大于一天正常值", function() {
      expect(func.validateScale(4320)).to.be.true;
    });
  });
});
