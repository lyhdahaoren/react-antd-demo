const returnUrl = (val)=>{
  let obj = {};
  try {
    switch (val) {
      case 'development':
        obj.ruby_axiosUrl = '/sss';
        obj.cms_url = '/lyh';
        obj.appid = '';
        obj.stockUrl = '//wv.tougubang.net/stock/stocks';
        obj.ihaogu = 'https://tapp.ihaogu.com/riskResult'
        obj.ihaogu1 = 'https://tapp.ihaogu.com/riskAssessmentIndex'
        break;
      case 'dev':
        obj.ruby_axiosUrl = '//tapp.ihaogu.com';
        obj.cms_url = '//tcms.tougub.com/';
        obj.stockUrl = '//wv.tougubang.net/stock/stocks';
        obj.appid = '';
        obj.ihaogu = 'https://tapp.ihaogu.com/riskResult'
        obj.ihaogu1 = 'https://tapp.ihaogu.com/riskAssessmentIndex'
        break;
      case 'production':
        obj.ruby_axiosUrl = '//app.ihaogu.com';
        obj.cms_url = '//cms.tougub.com/';
        obj.stockUrl = '//wv.tougub.com/stock/stocks';
        obj.appid = '';
        obj.ihaogu = 'https://app.ihaogu.com/riskResult'
        obj.ihaogu1 = 'https://app.ihaogu.com/riskAssessmentIndex'
        break;
      default:
        obj.ruby_axiosUrl = '//app.ihaogu.com';
        obj.stockUrl = '//wv.tougub.com/stock/stocks';
        obj.cms_url = '//cms.tougub.com/';
        obj.appid = '';
        obj.ihaogu = 'https://app.ihaogu.com/riskResult'
        obj.ihaogu1 = 'https://app.ihaogu.com/riskAssessmentIndex'
    }
  } catch (e) {
    obj.ruby_axiosUrl = '//app.ihaogu.com';
    obj.cms_url = '//cms.tougub.com/';
    obj.stockUrl = '//wv.tougub.com/stock/stocks';
    obj.appid = '';
    obj.ihaogu = 'https://app.ihaogu.com/riskResult'
    obj.ihaogu1 = 'https://app.ihaogu.com/riskAssessmentIndex'
  }
  return obj;
}

export default returnUrl;