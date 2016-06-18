class ExportMailer < ActionMailer::Base
  def export_email(user)
    @user = user
    mg_client = Mailgun::Client.new ENV["MAILGUN_API_KEY"]
    html_output = render_to_string template: "export_mailer/export_email.html.erb"
    text_output = render_to_string template: "export_mailer/export_email.text.erb"

    message_params = {:from    => "forney.christina@gmail.com",
                      :to      => @user.email,
                      :subject => "Animal Observation Export",
                      :html    => html_output.to_str,
                      :text    => text_output.to_str
                     }
    mg_client.send_message ENV["MAILGUN_DOMAIN"], message_params
  end
end
