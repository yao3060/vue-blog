<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <div class="card">
          <div class="card-header">About</div>
          <div class="card-body">
            <pre class="language-js">
            <code class="javascript">

var getMyInfo = {

    first_name  : '姚',
    last_name   : '迎迎',
    DoB         : '1985/03/02',
    website     : 'https://www.yaoyingying.com',
    email       : 'yao3060@163.com',
    location    : '上海',
    marital     : 'Unmarried',

    init: function(){
    },

    getEducation: function(){
        var e = {
            degree  : 'Polytechnic',
            major   : 'Software Engineering',
            school  : 'fuzhou university'
        };
        return e;
    },
    getLanguageSkills: function(){
        return {
            english:{
                level   : 'Good',
                R_W     : 'Good',
                L_S     : 'Good'
            }
        };
    },
    getItSkills: function(){
        return {
            PHP             : 8,
            CSS             : 8,
            jQuery          : 8,
            WordPress       : 8,
            'Angular/VUE'   : 6,
            IONIC           : 5,
            Photoshop       : 5,
            MySQL           : 5,
            'Ubuntu/Mac'    : 5
        };
    },
    getExperiences: function(){
        return {

            yubu :{
                title : 'CTO',
                company_name: '上海跃步文化传播中心',
                website: 'http://www.vipsports.com.cn',
                time_range: '2015.06- now',
                description: [
                    '公司运营', '团队管理', '网站开发', 'APP开发'
                ]
            },

            itc   :{
                title: 'Wordpress Lead developer',
                company_name: 'IT Consultis',
                website     : 'http://it-consultis.com',
                company_type: 'Foreign Comp.(Eur./N.Amer.)',
                platform    : 'Mac + Apache PHP MySQL',
                time_range  : '2011.06 - 2015.05',
                description : {
                    title   : 'Soft Outsourcing',
                    desc    : [
                        'Wordpress + WPML + Woocommerce 企业网站和小型电子商务建设',
                        'Magento 电子商务网站',
                        'Wordpress 微信微站',
                        '天猫商城店铺装修'
                    ]
                }
            },
            austargroup : {
                title: '前端工程师',
                company_name: '澳星集团',
                website:'http://austargroup.com',
                time_range: '2009.08-2011.06'
            }
        };
    }
};
            </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name:'About',
    title: 'My Blog | About'
  }
</script>
