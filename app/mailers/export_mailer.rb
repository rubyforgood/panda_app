class ExportMailer < ActionMailer::Base

  class Attachment < DelegateClass(StringIO)
    def path
      "observation_report.csv"
    end
  end

  def self.export_email(email, subject, csv_string)
    @email = email
    mg_client = Mailgun::Client.new ENV["MAILGUN_API_KEY"]
    html_output = render_to_string "export_email.html.erb"
    text_output = render_to_string "export_email.text.erb"

    attachment = Attachment.new(StringIO.new(csv_string))

    message_params = {:from    => "no-reply@panda-app.herokuapps.com",
                      :to      => @email,
                      :subject => subject,
                      :html    => html_output.to_str,
                      :text    => text_output.to_str,
                      :attachment => attachment
                     }
    mg_client.send_message ENV["MAILGUN_DOMAIN"], message_params
  end

  def self.render_to_string template
    ERB.new(File.read("#{Rails.root}/app/views/export_mailer/#{template}")).result(binding)
  end
end
