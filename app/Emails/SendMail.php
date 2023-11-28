<?php

namespace App\Emails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Config;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    private $details = [];
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $to = $this->details['to'];
        $title = $this->details['title'];
        $body = $this->details['body'];
    
        // Check if the 'blade_template' key exists and has a value
        if (!empty($this->details['blade_template'])) {
            $template = $this->details['blade_template'];
        } else {
            // Use a default template if 'blade_template' is not set or empty
            $template = null;
        }
    
        $fileattachment = $this->details['attachment'] ?? [];
        $from = Config::get('system.mail_from_address');
        $from_name = Config::get('system.mail_from_name');
        $mailer = $this
            ->subject($title);
    
        if (!empty($template) && view()->exists($template)) {
            // Render the view if it exists
            $mailer->view($template, [
                'details' => $this->details,
            ]);
        } else {
            $mailer->html($body);
        }
    
        if ($fileattachment && $fileattachment['import_mode'] == 'single_file') {
            $mailer->attach($fileattachment['temp_path'], [
                'as' => $fileattachment['original_name'],
                'mime' => 'csv',
            ]);
        }
    
        if (!empty($from) && !empty($from_name)) {
            $mailer->from($from, $from_name);
        }
    
        return $mailer;
    }

}
