class Admin::MailerController < Admin::ApplicationController
  # This controller is simply a development tool to preview email templates
  def preview_export_email
    @email = User.first.email
    render :file => "export_mailer/export_email.html.erb", :layout => false
  end
end
