System.register(["./p-b4c0cf28.system.js"],(function(e){"use strict";var s,t,i;return{setters:[function(e){s=e.r;t=e.h;i=e.H}],execute:function(){var a='@charset "UTF-8";.sc-bds-input-password-h{display:block}.input__password--icon.sc-bds-input-password{color:#8ca0b3;display:-ms-flexbox;display:flex}';var o=e("bds_input_password",function(){function e(e){var t=this;s(this,e);this.openEyes=false;this.value="";this.label="";this.inputName="";this.readonly=false;this.helperMessage="";this.errorMessage="";this.danger=false;this.icon="";this.disabled=false;this.autoCapitalize="off";this.autoComplete="off";this.placeholder="";this.toggleEyePassword=function(){if(!t.disabled){t.openEyes=!t.openEyes}}}e.prototype.getAutoComplete=function(){if(!this.openEyes)return"current-password";return this.autoComplete};e.prototype.render=function(){var e=this.openEyes?"eye-open":"eye-closed";var s=this.openEyes?"text":"password";var a=this.getAutoComplete();return t(i,null,t("bds-input",{type:s,"input-name":this.inputName,value:this.value,label:this.label,min:this.min,max:this.max,minlength:this.minlength,maxlength:this.maxlength,"helper-message":this.helperMessage,"error-message":this.errorMessage,danger:this.danger,icon:this.icon,disabled:this.disabled,readonly:this.readonly,"auto-complete":a,"auto-capitalize":this.autoCapitalize,placeholder:this.placeholder},t("div",{slot:"input-right",class:"input__password--icon",onClick:this.toggleEyePassword},t("bds-icon",{size:"small",name:e,color:"inherit"}))))};return e}());o.style=a}}}));