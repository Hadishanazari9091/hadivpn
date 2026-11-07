package ir.hadex.vpn

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.Gravity
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast

class MainActivity : Activity() {
    private val tailscalePackage = "com.tailscale.ipn"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val pad = (24 * resources.displayMetrics.density).toInt()
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER_HORIZONTAL
            setPadding(pad, pad * 2, pad, pad)
            setBackgroundColor(0xFF101522.toInt())
        }
        val title = TextView(this).apply {
            text = "Hadex VPN"
            textSize = 28f
            setTextColor(0xFFFFFFFF.toInt())
            gravity = Gravity.CENTER
        }
        val subtitle = TextView(this).apply {
            text = "اتصال امن از طریق شبکه خصوصی شما"
            textSize = 16f
            setTextColor(0xFFB9C3D5.toInt())
            gravity = Gravity.CENTER
            setPadding(0, pad / 2, 0, pad * 2)
        }
        val info = TextView(this).apply {
            text = "برای استفاده، برنامه رسمی Tailscale باید نصب و با حساب Hadex وارد شده باشد. سپس Exit Node با نام github-runnervm7aw5e را در Tailscale انتخاب کنید."
            textSize = 15f
            setTextColor(0xFFE8EDFA.toInt())
            setPadding(0, 0, 0, pad)
        }
        val open = Button(this).apply {
            text = "باز کردن Tailscale"
            setOnClickListener { openTailscale() }
        }
        val install = Button(this).apply {
            text = "نصب Tailscale"
            setOnClickListener {
                startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=com.tailscale.ipn")))
            }
        }
        root.addView(title, matchWrap())
        root.addView(subtitle, matchWrap())
        root.addView(info, matchWrap())
        root.addView(open, matchWrap())
        root.addView(install, matchWrap())
        setContentView(root)
    }

    private fun openTailscale() {
        val launch = packageManager.getLaunchIntentForPackage(tailscalePackage)
        if (launch != null) startActivity(launch)
        else Toast.makeText(this, "ابتدا Tailscale را نصب کنید.", Toast.LENGTH_LONG).show()
    }

    private fun matchWrap() = LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.WRAP_CONTENT
    ).apply { bottomMargin = (10 * resources.displayMetrics.density).toInt() }
}
