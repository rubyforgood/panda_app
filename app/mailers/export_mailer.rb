class ExportMailer < ActionMailer::Base
  def export_email(user, csv_string)
    @user = user
    mg_client = Mailgun::Client.new ENV["MAILGUN_API_KEY"]
    html_output = render_to_string template: "export_mailer/export_email.html.erb"
    text_output = render_to_string template: "export_mailer/export_email.text.erb"

    attachment = StringIO.new(csv_string)
    def attachment.path
      "observtion_report.csv"
    end

    message_params = {:from    => "no-reply@panda-app.herokuapps.com",
                      :to      => @user.email,
                      :subject => "Animal Observation Export",
                      :html    => html_output.to_str,
                      :text    => text_output.to_str,
                      :attachment => attachment
                     }
    mg_client.send_message ENV["MAILGUN_DOMAIN"], message_params
  end
end
